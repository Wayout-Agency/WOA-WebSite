#!/bin/sh

docker run --name dev-pg -p 5432:5432 -e POSTGRES_PASSWORD=wayout_dev -e POSTGRES_USER=wayout_dev -e POSTGRES_PASSWORD=wayout_dev -d postgres:14.4
docker run --name dev-pg -p 7878:5432 -e POSTGRES_PASSWORD=wayout_test -e POSTGRES_USER=wayout_test -e POSTGRES_PASSWORD=wayout_test -d postgres:14.4