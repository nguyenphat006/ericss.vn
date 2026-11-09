"""Vai trò trong CMS. Hiện chỉ một vai trò "Quản trị" (xuất bản trực tiếp); thêm vai trò khi cần."""

from django.contrib.auth.models import Group, Permission
from django.db.models import Q

ADMIN_GROUP = "Quản trị"

# Quyền nội dung của các app này được cấp cho nhóm Quản trị
CONTENT_APPS = ["wagtailimages", "wagtaildocs", "wagtailcore", "wagtail_localize"]


def ensure_admin_group() -> Group:
    """Tạo (hoặc cập nhật) nhóm Quản trị với quyền vào admin và quyền nội dung. Idempotent."""
    group, _ = Group.objects.get_or_create(name=ADMIN_GROUP)
    perms = Permission.objects.filter(
        Q(content_type__app_label="wagtailadmin", codename="access_admin")
        | Q(content_type__app_label__in=CONTENT_APPS)
    )
    group.permissions.add(*perms)
    return group
