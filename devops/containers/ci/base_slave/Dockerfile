FROM ubuntu:trusty

# SSH
RUN apt-get update && apt-get install -y openssh-server
RUN mkdir -p /var/run/sshd
RUN sed -i 's/PermitRootLogin without-password/PermitRootLogin yes/' /etc/ssh/sshd_config
EXPOSE 22

# Jenkins user
RUN adduser --quiet jenkins
USER jenkins
RUN mkdir -p /home/jenkins/.ssh
ADD ./jenkins.pub /home/jenkins/jenkins.pub
RUN cat /home/jenkins/jenkins.pub > /home/jenkins/.ssh/authorized_keys

USER root

# Jenkins slave
RUN apt-get install -y openjdk-7-jdk

RUN apt-get install -y curl
RUN apt-get install -y git

CMD ["/usr/sbin/sshd", "-D"]