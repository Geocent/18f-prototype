#!/usr/bin/env bash
#######
# $1 = docker machine name
# $2 = remote username
#######

docker-machine active ${1}
eval "$(docker-machine env)"
scp -i ~/.docker/machine/machines/${1}/id_rsa ./default.conf ${2}@$(docker-machine ip):/data/nginx/
docker-compose -f ci1.yml up -d

