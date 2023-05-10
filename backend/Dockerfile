FROM python:3.10 as development_build

ENV UPLOAD_DIRECTORY=/var/www/media
ENV POETRY_HOME=/opt/poetry
ENV POETRY_VENV=/opt/poetry-venv
ENV POETRY_CACHE_DIR=/opt/.cache

RUN pip install poetry

RUN apt-get update && apt-get install -y ffmpeg lame flac vorbis-tools

COPY app /code/app

WORKDIR /code/app

RUN poetry install --no-dev

WORKDIR /code/app/app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7878"]