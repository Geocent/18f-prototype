#!/usr/bin/env bash

if [[ $(id -u) == 0 ]]; then
  echo "You can not run this script as sudo!!!"
  exit 1
fi

if [ "$(uname)" == "Darwin" ]; then
    brew update
    brew install nvm
else
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash
fi

export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh

nvm install v0.12.4
nvm use 0.12

npm install -g yo bower gulp@3.8.11 protractor generator-gulp-angular

echo "-----------------------------------------------------"
echo " Please add the following to your .profile or .zshrc "
echo "-----------------------------------------------------"
echo "export NVM_DIR=~/.nvm"
echo "source $(brew --prefix nvm)/nvm.sh"
