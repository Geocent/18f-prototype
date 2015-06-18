#!/usr/bin/env bash

mkdir -p /data/nginx
mkdir -p /var/jenkins_home

chown -R ${USER:=$(/usr/bin/id -run)}:$USER /data
chown -R ${USER:=$(/usr/bin/id -run)}:$USER /var/jenkins_home
