"""Gom route của API /api/v1/. Mỗi app khai báo apps/<app>/api/urls.py rồi include ở đây."""

from django.urls import URLPattern, URLResolver

app_name = "api"

# Chưa có loại nội dung nào. Thêm app đầu tiên, vd: path("", include("apps.projects.api.urls"))
urlpatterns: list[URLPattern | URLResolver] = []
