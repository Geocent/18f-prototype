#!/usr/bin/env bash

ACTIVE_ENV=dev.yml
WEB_CONTAINER_NAME=""

CLIENT_PATH="client"

up() {
    docker-compose -f ${ACTIVE_ENV} stop;
    docker-compose -f ${ACTIVE_ENV} rm;
    docker-compose -f ${ACTIVE_ENV} up -d --no-recreate;
}

down() {
    docker-compose -f ${ACTIVE_ENV} stop;
}

client_build() {
    cd ${CLIENT_PATH};
    gulp;
    cd -;
}

$@