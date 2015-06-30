#!/usr/bin/env bash

ACTIVE_ENV=dev.yml

if [ "$(uname)" == "Darwin" ]; then
    if [ $(boot2docker status) != "running" ]
    then
        echo "boot2docker needs to be running!"
        echo "starting boot2docker . . ."
        boot2docker up
    fi
fi


[ -z "$NVM_PATH" ] && echo "NVM does not seem to be running" &&  echo "Execute 'nvm use 0.12' to set the environment" && exit 1;

build() {
    cd ${CLIENT_PATH};
    gulp;
    cd -;
}

up() {
    docker-compose -f ${ACTIVE_ENV} stop;
    docker-compose -f ${ACTIVE_ENV} rm;
    docker-compose -f ${ACTIVE_ENV} up -d --no-recreate;

    echo
    if [ "$(uname)" == "Darwin" ]; then
        echo "The app should be available at: $(boot2docker ip):8005"
    else
        echo "The app should be available at: 127.0.0.1:8005"
    fi
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