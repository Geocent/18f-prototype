#!/usr/bin/env bash

if [[ $(id -u) == 0 ]]; then
  echo "You can not run this script as sudo!!!"
  exit 1
fi

# Virtualbox is required!

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

docker run hello-world