#!/usr/bin/env bash

ACTIVE_ENV=dev.yml
WEB_CONTAINER_NAME=""

CLIENT_PATH="client"

if [ $(boot2docker status) != "running" ]
then
    echo "boot2docker needs to be running!"
    echo "starting boot2docker . . ."
    boot2docker up
fi

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