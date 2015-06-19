FROM geocent/base_slave

USER jenkins
ENV NVM_DIR /home/jenkins/.nvm
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash
RUN . ~/.nvm/nvm.sh && nvm install v0.12.4
RUN . ~/.nvm/nvm.sh && nvm use 0.12 && npm install -g bower gulp@3.8.11

CMD ["/usr/sbin/sshd", "-D"]