#!/usr/bin/env bash

if [[ $(id -u) == 0 ]]; then
  echo "You can not run this script as sudo!!!"
  exit 1
fi

brew update
brew install nvm

export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh

nvm install v0.12.4

nvm use 0.12

npm install -g yo
npm install -g bower
npm install -g gulp@3.8.11
npm install -g generator-gulp-angular

echo "-----------------------------------------------------"
echo " Please add the following to your .profile or .zshrc "
echo "-----------------------------------------------------"
echo "export NVM_DIR=~/.nvm"
echo "source $(brew --prefix nvm)/nvm.sh"
