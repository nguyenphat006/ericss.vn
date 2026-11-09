# Ericss Portfolio

Website portfolio: Next.js 16 (frontend) + Django 5.2 / Wagtail 8 (CMS headless, backend).

| Thư mục | Nội dung | Cổng dev |
| --- | --- | --- |
| `frontend/` | Next.js 16 App Router, next-intl (vi mặc định, en tại `/en`), Tailwind 4 + shadcn/ui, motion | 4100 |
| `backend/` | Django 5.2 + Wagtail 8, DRF API `/api/v1`, admin `/admin` | 9100 |
| `docs/` | Tài liệu yêu cầu | |

## Frontend

```bash
cd frontend
npm install
cp .env.example .env.local   # CMS_API_URL trống = dùng dữ liệu mock
npm run dev                  # http://localhost:4100
npm run lint && npm run build
```

## Backend (Windows, Git Bash)

Máy chặn chạy `.exe` trong Documents, nên virtualenv đặt ngoài repo và gọi uv qua `python -m uv`
(`python -m pip install --user uv==0.13.5`).

```bash
cd backend
export UV_PROJECT_ENVIRONMENT="$LOCALAPPDATA/ericss-portfolio/venv"
python -m uv sync
python -m uv run poe bootstrap          # migrate + locale vi/en + nhóm Quản trị
python -m uv run python manage.py createsuperuser
python -m uv run poe dev                # http://127.0.0.1:9100/admin/
python -m uv run poe check              # lint + type + migration + test
```

Hook trước commit: `python -m uv run pre-commit install` (chạy trong `backend/`, cấu hình ở `.pre-commit-config.yaml`).
