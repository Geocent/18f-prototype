FROM geocent/base_slave

RUN apt-get install -y software-properties-common python-software-properties

RUN \
  add-apt-repository -y ppa:nginx/stable && \
  apt-get update && \
  apt-get install -y nginx && \
  rm -rf /var/lib/apt/lists/* && \
  echo "\ndaemon off;" >> /etc/nginx/nginx.conf && \
  chown -R www-data:www-data /var/lib/nginx

RUN apt-get update && apt-get install -y supervisor
RUN mkdir -p /var/log/supervisor
COPY ./supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

ADD ./certs/ads-dev.geocent.com.key /etc/ssl/ads-dev.geocent.com.key
ADD ./certs/geocent.pem /etc/ssl/geocent.pem
ADD ./default /etc/nginx/sites-available/default
RUN chown -R jenkins:jenkins /usr/share/nginx/html

CMD ["/usr/bin/supervisord"]
