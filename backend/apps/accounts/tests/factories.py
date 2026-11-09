from typing import Any

from apps.accounts.models import User


def create_user(**kwargs: Any) -> User:
    n = User.objects.count() + 1
    defaults: dict[str, Any] = {"username": f"user{n}", "email": f"user{n}@example.com"}
    defaults.update(kwargs)
    password = defaults.pop("password", "a-strong-test-password")
    return User.objects.create_user(password=password, **defaults)
