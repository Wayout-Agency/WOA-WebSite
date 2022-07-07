import asyncio
import sys
from ast import For
from enum import Enum
from pathlib import Path
from typing import NamedTuple

from colorama import Fore, Style
from core.security import get_password_hash
from crud.crud_user import user
from dotenv import dotenv_values
from schemas.user import CreateUser
from tortoise import Tortoise


class DBConfig(NamedTuple):
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    DB_HOST: str
    DB_PORT: int
    POSTGRES_DB: str
    SECRET_KEY: str


BASEDIR = Path(__file__).resolve().parent.parent.parent.parent


def _get_settings() -> DBConfig:
    return DBConfig(**dotenv_values(BASEDIR / "config" / ".env"))


async def init_db():
    db = _get_settings()

    await Tortoise.init(
        db_url="postgres://{}:{}@{}:{}/{}".format(
            db.POSTGRES_USER,
            db.POSTGRES_PASSWORD,
            db.DB_HOST,
            db.DB_PORT,
            db.POSTGRES_DB,
        ),
        modules={
            "models": [
                "models.users",
            ]
        },
    )


async def _create_user(login: str, password: str):
    hashed_passwrod = get_password_hash(password)
    user_schema = CreateUser(login=login, password=hashed_passwrod)
    await user.create(user_schema)
    print(Fore.GREEN + "User was successefully created")
    print(Style.RESET_ALL)


async def _get_all():
    users = await user.get_all()
    print(Fore.CYAN + "**" * 13 + "All users" + "*" * 25 + "\n")
    print("=" * 60)
    for _user in users:
        print(f"User login: {_user.login}")
        print(f"User password: {_user.password}")
        print("=" * 60)
    print(Style.RESET_ALL)


async def _delete_user(login: str):
    await user.delete(login)
    print(Fore.RED + "User was successefully deleted")
    print(Style.RESET_ALL)


class Actions(Enum):
    all = "all"
    create = "create"
    delete = "delete"


async def run_action():
    try:
        action = [Actions.all, Actions.create, Actions.delete][
            int(input("Type action index - [all(0), create(1), delete(2)]: "))
        ]
    except IndexError:
        print("Are u seriously??")
        sys.exit(1)
    match action:
        case Actions.all:
            await _get_all()
        case Actions.create:
            login = str(input("Type login for user: "))
            password = str(input("Type password for user: "))
            await _create_user(login, password)
        case Actions.delete:
            login = str(input("Type user login: "))
            await _delete_user(login)
        case _:
            print("Shit happends :)")
            sys.exit(1)


async def main():
    print(
        Fore.YELLOW
        + "Warning: This is a very simple program\nwritten in 10 minutes. Don't expect it to work well"
    )
    print(Style.RESET_ALL)
    await init_db()
    await run_action()


if __name__ == "__main__":
    asyncio.run(main())
