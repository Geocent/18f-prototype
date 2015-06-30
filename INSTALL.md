# 18f-prototype Development

## Initial Setup

### Development Pre-requisites
- OSX, Ubuntu, or Fedora

### Development Pre-requisites with Docker for additional testing
- OSX, Ubuntu 14.04+, or Fedora 22
- VirtualBox (if using OSX)
- Homebrew (if using OSX)

### Steps - Basic Setup
1. `git clone git@github.com:Geocent/18f-prototype.git`
2. `bash ./devops/setup/dev_setup.sh`
3. `cd client;`
4. `npm install && bower install`
5. `gulp serve`

### Steps - Including Docker for addtional testing
1. `bash ./devops/setup/docker_setup.sh`
2. View info below under `Running - production-like nginx test server`

## Development

### Development session steps
- When creating a new terminal shell:
    - `nvm use 0.12`

### Running - local nodejs test server
* `cd client`
* `gulp serve` to launch a browser sync server on your source files
* `gulp serve:dist` to launch a server on your optimized application

### Running - production-like nginx test server
* `./mgr.sh build` - runs a `gulp` build in the client directory
* `./mgr.sh up` - stops, removes, and restarts all containers
* Use `boot2docker ip` to see the IP address that you should use that binds the docker containers locally.  Then use a browser to go to "[IP ADDRESS]:8005".  For example, "192.168.59.103:8005".

### Testing - unit/integration
* `cd client`
* `gulp test` to launch your unit tests with Karma
* `gulp test:auto` to launch your unit tests with Karma in watch mode

### Testing - functional/regression
* `gulp protractor` to launch your e2e tests with Protractor
* `gulp protractor:dist` to launch your e2e tests with Protractor on the dist files

### Building dist 
1. `cd client`
2. `gulp` or `gulp build` to build an optimized version of your application in `/dist`

## Docker-Compose commands
- Docker compose provides a nice, declarative syntax for defining docker containers that work together in an environment.
* `docker-compose ps` - List running containers 
* `docker-compose stop` -  running containers 
* `docker-compose rm` - Remove running containers 
* `docker-compose -f dev.yml up [service_name]` - Start up a single compose service directly


## Docker commands
* `boot2docker up` - Kick up boot2docker VM (required each time to use Docker)
* `boot2docker ip` - View IP address of boot2docker service
* `docker ps` - View all running containers
* `docker exec -it [name_of_container] /bin/bash` - Enter a running container and run any commands
