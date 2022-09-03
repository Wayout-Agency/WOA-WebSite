from typing import NamedTuple

from fastapi import HTTPException, status


class Errors(NamedTuple):
    not_found = HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Item not found",
    )

    forbidden = HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Not enough privileges",
    )

    out_token = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Outdated token",
    )

    inv_token = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid token",
    )

    credentials = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )

    password_validation = HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail="Bad password validaton",
    )

    crit = HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail="Invalid data",
    )

    bad_req = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Files with this id does not exist",
    )

    valid_error = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Validation error",
    )
