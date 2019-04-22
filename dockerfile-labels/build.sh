#! /bin/sh
docker build -t labels --build-arg CREATED_DATE="$(date -u +"%Y-%m-%dT%H:%M:%SZ")" --build-arg SOURCE_COMMIT="$(git rev-parse --short HEAD)" .
