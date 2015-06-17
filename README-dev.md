# 18f-prototype Development

## Initial Setup

### PreReqs

- OSX
- VirtualBox
- Homebrew

### Steps
1. `git clone git@github.com:Geocent/18f-prototype.git`
2. `bash ./devops/setup/dev_setup.sh`
3. `bash ./devops/setup/docker_setup.sh`


## Running - local nodejs server
* `cd client`
* `gulp serve` to launch a browser sync server on your source files
* `gulp serve:dist` to launch a server on your optimized application

## Running - full test server
* `./mgr.sh up` - stops all running containers

## Testing - local nodejs server
* `cd client`
* `gulp test` to launch your unit tests with Karma
* `gulp test:auto` to launch your unit tests with Karma in watch mode
* `gulp protractor` to launch your e2e tests with Protractor
* `gulp protractor:dist` to launch your e2e tests with Protractor on the dist files

## Building
* `cd client`
* `gulp` or `gulp build` to build an optimized version of your application in `/dist`


## Deployment


## Docker-Compose commands
- Docker compose provides a nice, declarative syntax for defining docker containers that work together in an environment.
* `docker-compose ps` - List running containers 
* `docker-compose stop` -  running containers 
* `docker-compose rm` - Remove running containers 


## Docker commands
* `boot2docker up` - Kick up boot2docker VM (required each time to use Docker)
* `docker ps` - View all running containers
* `docker exec -it [name_of_container] /bin/bash` - Enter a running container and run any commands
