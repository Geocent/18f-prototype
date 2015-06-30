#!/usr/bin/env bash

if [ "$(uname)" == "Darwin" ]; then
    if [[ $(id -u) == 0 ]]; then
      echo "You can not run this script as sudo!!!"
      exit 1
    fi

    brew update
    brew install boot2docker
    brew install docker
    brew install docker-compose

    boot2docker init
    boot2docker start

    echo "---------------------------------------------------------------------------------------"
    echo "Below are boot2docker environment variables that you can add to your .zshrc or .profile"
    echo "---------------------------------------------------------------------------------------"
    boot2docker shellinit
    eval "$(boot2docker shellinit)"

elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
   if [ -f /etc/debian_version ]; then
       apt-get update && apt-get install wget
       wget -qO- https://get.docker.com/ | sh
   elif [ -f /etc/redhat-release ]; then
        curl -O -sSL https://get.docker.com/rpm/1.7.0/fedora-22/RPMS/x86_64/docker-engine-1.7.0-1.fc22.x86_64.rpm
        yum localinstall --nogpgcheck docker-engine-1.7.0-1.fc22.x86_64.rpm
        service docker start
   else
        echo "Your OS is not currently supported"
   fi


fi

docker run hello-world