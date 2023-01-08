<p align="center">
  <a href="https://github.com/Flict-dev/Wayout-site">
    <img src="https://user-images.githubusercontent.com/76905733/179758514-859a957f-5c46-4c0e-ac6d-f14c4f2225fa.png" alt="Logo" width="80" height="80">
  </a>
  <h1 align="center">Wayout site
</h1>
</p>


![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/Flict-dev/Wayout-site/pytest.yml?label=build) ![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg) [![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)
## Features
- **[FastAPI](https://fastapi.tiangolo.com/)** (Python 3.10)
- **[Tortoise](https://tortoise.github.io/index.html)** for ORM
- **[Poetry](https://python-poetry.org/)** package manager
- **[Aerich](https://github.com/tortoise/aerich)** for migrations
- **[Pytest](https://docs.pytest.org/en/latest/)** for backend tests
- **[Next](https://nextjs.org/)** for frontend
- **[Prettier](https://prettier.io/)**/**[ESLint](https://eslint.org/)** (Java Script)
- [Black](https://github.com/psf/black) (Python)


## Docker:whale2:
```
docker-compose up
```

## Docs:blue_book:
Check swagger documentation on http://localhost:8000/api/v1/docs

## Testing:test_tube:
```
docker-compose up -d postgres_test_db
pytest
```
