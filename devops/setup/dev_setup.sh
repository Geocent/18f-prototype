#!/usr/bin/env bash

brew update
brew install nvm

nvm install v0.12.4

nvm use 0.12

npm install -g yo
npm install -g bower
npm install -g gulp@3.8.11

npm install -g generator-gulp-angular
