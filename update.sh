#!/bin/sh

git pull origin master
docker-compose up -d --no-deps --build