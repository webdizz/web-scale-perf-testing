# -*- mode: ruby -*-
# vi: set ft=ruby :
vm_ip = '192.168.176.128'

Vagrant.configure(2) do |config|
  config.vm.box = "williamyeh/ubuntu-trusty64-docker"
  config.vm.post_up_message = "Welcome! Your box is available at IP: #{vm_ip}"
  config.vm.network "private_network", ip: vm_ip

  config.vm.provider "virtualbox" do |vb|
    vb.gui = false
    vb.memory = "4024"
  end

  config.vm.provision "shell",
    run: "once",
    inline: <<-SHELL
      apt-get -y install software-properties-common python-software-properties
      add-apt-repository ppa:webupd8team/java
      apt-get -y update
      echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections
      apt-get -y install oracle-java8-installer
      apt-get clean
      update-alternatives --display java
    SHELL

  config.vm.provision "shell",
    run: "once",
    inline: <<-SHELL
      apt-get -y install inux-image-extra-$(uname -r) docker-engine
      curl -L https://github.com/docker/compose/releases/download/1.5.2/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
      chmod +x /usr/local/bin/docker-compose
      ln -s /usr/local/bin/docker-compose /usr/local/bin/dc
      curl -L https://raw.githubusercontent.com/docker/docker/master/contrib/completion/bash/docker > /etc/bash_completion.d/docker
      curl -L https://raw.githubusercontent.com/docker/compose/master/contrib/completion/bash/docker-compose > /etc/bash_completion.d/docker-compose
      curl -L https://raw.githubusercontent.com/docker/compose/master/contrib/completion/bash/docker-compose > /etc/bash_completion.d/dc
      sed -i -E "s/_docker_compose [^)]+/_docker_compose dc/g" /etc/bash_completion.d/dc
    SHELL

end
