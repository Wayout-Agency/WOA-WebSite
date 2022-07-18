FROM python:3.10 as development_build

ENV POETRY_NO_INTERACTION=1 \
  POETRY_VIRTUALENVS_CREATE=false \
  POETRY_CACHE_DIR='/var/cache/pypoetry' \
  PATH="$PATH:/root/.poetry/bin"

RUN apt update && apt upgrade -y \
  # Install dependencies  \
  && apt install libpq-dev \
  # Install poetry package manager
  && curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python - \
  && poetry --version \
  # Clean build cache
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
  && apt-get clean -y && rm -rf /var/lib/apt/lists/*


ENV UPLOAD_DIRECTORY=/var/www/media

COPY app /code/app

WORKDIR /code/app

RUN poetry install --no-dev

WORKDIR /code/app/app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]