"""Khởi tạo dữ liệu nền sau migrate: locale vi/en và nhóm Quản trị. Chạy lại an toàn.

python manage.py bootstrap
"""

from typing import Any

from django.core.management.base import BaseCommand
from django.db import transaction

from apps.accounts.services import ensure_admin_group
from apps.core.services import ensure_locales


class Command(BaseCommand):
    help = "Tạo locale vi/en và nhóm quyền Quản trị (idempotent)."

    @transaction.atomic
    def handle(self, *args: Any, **options: Any) -> None:
        locales = ensure_locales()
        group = ensure_admin_group()
        codes = ", ".join(loc.language_code for loc in locales)
        self.stdout.write(
            self.style.SUCCESS(
                f"Locale: {codes}. Nhóm {group.name}: {group.permissions.count()} quyền."
            )
        )
