#!/usr/bin/env bash
#######
# $1 = docker machine name
#######

docker-machine active ${1}
eval "$(docker-machine env)"
docker-compose -f master.yml up -d

