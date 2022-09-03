#!/bin/sh

docker run --name dev-pg -p 5432:5432 -e POSTGRES_PASSWORD=wayout_dev -e POSTGRES_USER=wayout_dev -e POSTGRES_PASSWORD=wayout_dev -d postgres:14.4