"""Thao tác ghi dùng chung của app core."""

from django.conf import settings
from wagtail.models import Locale


def ensure_locales() -> list[Locale]:
    """Tạo locale cho mọi ngôn ngữ trong WAGTAIL_CONTENT_LANGUAGES (idempotent)."""
    return [
        Locale.objects.get_or_create(language_code=code)[0]
        for code, _name in settings.WAGTAIL_CONTENT_LANGUAGES
    ]
