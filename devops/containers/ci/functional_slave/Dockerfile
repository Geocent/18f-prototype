FROM geocent/base_slave

RUN apt-get update

RUN apt-get install -y \
  xvfb \
  libexif12 \
  chromium-browser

# remove packages & listings to reduce image size
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

USER jenkins
ENV NVM_DIR /home/jenkins/.nvm
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash
RUN . ~/.nvm/nvm.sh && nvm install v0.12.4
RUN . ~/.nvm/nvm.sh && nvm use 0.12 && npm install -g bower gulp@3.8.11 protractor
RUN . ~/.nvm/nvm.sh && nvm use 0.12 && webdriver-manager update

USER root
RUN apt-get update && apt-get install -y supervisor
RUN mkdir -p /var/log/supervisor
COPY ./supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

CMD ["/usr/bin/supervisord"]
