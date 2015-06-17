#!/usr/bin/env bash

ACTIVE_ENV=dev.yml
CLIENT_PATH="client"

if [ $(boot2docker status) != "running" ]
then
    echo "boot2docker needs to be running!"
    echo "starting boot2docker . . ."
    boot2docker up
fi

if [ $(nvm current) != "v0.12.4" ]
then
    echo "nvm may not have updated your nodejs env variables"
    echo "run 'nvm use 0.12' to set the environment"
fi

build() {
    cd ${CLIENT_PATH};
    gulp;
    cd -;
}

up() {
    docker-compose -f ${ACTIVE_ENV} stop;
    docker-compose -f ${ACTIVE_ENV} rm;
    docker-compose -f ${ACTIVE_ENV} up -d --no-recreate;
}

status() {
    docker-compose -f ${ACTIVE_ENV} ps;
}

stop() {
    docker-compose -f ${ACTIVE_ENV} stop;
}

unit_test() {
    cd ${CLIENT_PATH};
    gulp test;
    cd -;
}

e2e_test() {
    cd ${CLIENT_PATH};
    gulp protractor;
    cd -;
}

$@