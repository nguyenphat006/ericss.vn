"""Test khung nền: health check, định dạng lỗi API, base model, bootstrap, webhook revalidate."""

import hashlib
import hmac
import json
import threading
from collections.abc import Iterator
from http.server import BaseHTTPRequestHandler, HTTPServer
from typing import Any
from unittest import mock

import pytest
from django.core.management import call_command
from django.db.utils import OperationalError
from django.test import override_settings
from rest_framework import exceptions
from rest_framework.views import APIView
from wagtail.models import Locale

from apps.accounts.services import ADMIN_GROUP
from apps.core.api.exceptions import exception_handler
from apps.core.revalidate import revalidate_on_commit, send_revalidate, sign
from apps.core.tests.support.models import Sample


def test_healthz(client: Any) -> None:
    res = client.get("/healthz")
    assert res.status_code == 200
    assert res.json() == {"status": "ok"}


@pytest.mark.django_db
def test_readyz_ok(client: Any) -> None:
    res = client.get("/readyz")
    assert res.status_code == 200
    assert res.json()["checks"]["database"] == "ok"


@pytest.mark.django_db
def test_readyz_db_error(client: Any) -> None:
    with mock.patch(
        "apps.core.views.connection.ensure_connection", side_effect=OperationalError("down")
    ):
        res = client.get("/readyz")
    assert res.status_code == 503
    assert res.json() == {"status": "unavailable", "checks": {"database": "error"}}


def _ctx() -> dict[str, Any]:
    return {"view": APIView()}


def test_error_format_not_found() -> None:
    from django.http import Http404

    res = exception_handler(Http404(), _ctx())
    assert res is not None
    assert res.status_code == 404
    assert res.data["error"]["code"] == "not_found"


def test_error_format_permission_denied() -> None:
    from django.core.exceptions import PermissionDenied

    res = exception_handler(PermissionDenied(), _ctx())
    assert res is not None
    assert res.status_code == 403
    assert res.data["error"]["code"] == "permission_denied"


def test_error_format_validation() -> None:
    res = exception_handler(exceptions.ValidationError({"page": ["sai"]}), _ctx())
    assert res is not None
    assert res.status_code == 400
    assert res.data["error"]["code"] == "invalid"
    assert res.data["error"]["details"] == {"page": ["sai"]}


def test_error_format_unhandled() -> None:
    res = exception_handler(RuntimeError("boom"), _ctx())
    assert res is not None
    assert res.status_code == 500
    assert res.data["error"]["code"] == "server_error"
    assert "boom" not in res.data["error"]["message"]


@pytest.mark.django_db
def test_base_models_stamp_and_archive(user: Any) -> None:
    obj = Sample(name="a")
    obj.stamp(user)
    obj.save()
    assert obj.created_by == user
    assert obj.updated_by == user
    assert obj.public_id is not None

    obj.stamp(None)
    obj.archive(actor=user)
    assert obj.is_archived
    assert not Sample.objects.filter(pk=obj.pk).exists()
    assert Sample.all_objects.archived().filter(pk=obj.pk).exists()

    obj.restore()
    obj.refresh_from_db()
    assert obj.archived_at is None
    assert Sample.objects.filter(pk=obj.pk).exists()


@pytest.mark.django_db
def test_bootstrap_is_idempotent() -> None:
    call_command("bootstrap")
    call_command("bootstrap")
    assert set(Locale.objects.values_list("language_code", flat=True)) == {"vi", "en"}
    from django.contrib.auth.models import Group

    group = Group.objects.get(name=ADMIN_GROUP)
    assert group.permissions.filter(codename="access_admin").exists()


class _Capture(BaseHTTPRequestHandler):
    received: list[dict[str, Any]] = []

    def do_POST(self) -> None:
        body = self.rfile.read(int(self.headers["Content-Length"]))
        headers = {k.lower(): v for k, v in self.headers.items()}
        _Capture.received.append({"headers": headers, "body": body})
        self.send_response(200)
        self.end_headers()

    def log_message(self, *args: Any) -> None:
        pass


@pytest.fixture
def capture_server() -> Iterator[str]:
    _Capture.received = []
    server = HTTPServer(("127.0.0.1", 0), _Capture)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    yield f"http://127.0.0.1:{server.server_address[1]}/api/revalidate"
    server.shutdown()


def test_revalidate_signs_request(capture_server: str) -> None:
    with override_settings(FRONTEND_REVALIDATE_URL=capture_server, CMS_SHARED_SECRET="s3cret"):
        assert send_revalidate(["cms"]) is True
    req = _Capture.received[0]
    assert json.loads(req["body"]) == {"tags": ["cms"]}
    ts = req["headers"]["x-cms-timestamp"]
    expected = hmac.new(b"s3cret", ts.encode() + b"." + req["body"], hashlib.sha256).hexdigest()
    assert req["headers"]["x-cms-signature"] == expected == sign("s3cret", ts, req["body"])


def test_revalidate_disabled_without_settings() -> None:
    with override_settings(FRONTEND_REVALIDATE_URL="", CMS_SHARED_SECRET=""):
        assert send_revalidate(["cms"]) is False


def test_revalidate_network_error_returns_false() -> None:
    with override_settings(
        FRONTEND_REVALIDATE_URL="http://127.0.0.1:9/api/revalidate", CMS_SHARED_SECRET="x"
    ):
        assert send_revalidate(["cms"]) is False


@pytest.mark.django_db
def test_revalidate_on_commit(django_capture_on_commit_callbacks: Any) -> None:
    with (
        mock.patch("apps.core.revalidate.send_revalidate") as send,
        django_capture_on_commit_callbacks(execute=True),
    ):
        revalidate_on_commit()
    send.assert_called_once_with(["cms"])
