# AWS EC2 Webserver Steps
This guide will walk you through spinning up an AWS EC2 instance, configuring it as a webserver using Nginx, then securing it using Certbot.

## Spin Up EC2 Instance
* Navigate to AWS EC2
* Select a region and click `Launch Instance`
* Select an AMI (Ubuntu 16.04 for example)
* Click through the different tabs until the security group
* Select `Add Rule` HTTP, HTTPS rules for everyone
* Select SSH rules for the office IP or personal IP
* Select new or known pem key
* Launch the instance

## Install Webserver
* The instance will appear green when ready
* Click on the instance, you'll see it has a public domain under `Public DNS`
* Navigate to that domain and you will see nothing
* Select instance and click `Connect`
* Copy the instructions to your command line
* Modify the permission of the pem key if you have not done so already
* Reference pem key then SSH into server:
```sh
ssh -i "/my/key/location/mykey.pem" ubuntu@public-ec2-domain.com
```
* Inside the instance we'll then install Nginx with:
```shell
sudo apt-get update
sudo apt-get install -y nginx
```
* Once the install is finished refresh the public EC2 instance domain, and voila!
* This site is unsecured and doesn't have a nice public domain associated with it

## Link a Domain With Route53
* Navigate to AWS Route53
* Select hosted zones
* Choose one of your zones, `mydomain.com` for example, [create one](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/CreatingHostedZone.html) if you don't already have one
* Click to add record
* Select a sub-domain name like `www.mydomain.com`
* Copy and paste the public IP of the EC2 instance into the `Values` field and create it
* Copy and paste the new domain into the Nginx entry (refer to attached config `nginx.conf`)
* Create a directory for `/var/www/www.mydomain.com`:
```shell
cd /var/www
sudo mkdir www.mydomain.com
```
* Create an `index.html` page and copy the sample markup into it (tip: in VIM hit `i` to insert, then paste as usual):
```shell
sudo touch index.html
sudo vim index.html
```
* Test and restart nginx:
```shell
sudo service nginx configtest
sudo service nginx restart
```
* If we now navigate to `www.mydomain.com` we'll see out sample content

## Securing an Instance
* To ensure we have a base level of security let's install Certbot (distributes let's encrypt certificates)
* Install it with:
```sh
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx 
```
* Navigate to the website folder on the webserver, should be in `/var/www/www.mydomain.com`
* Run the certbot command,
```sh
sudo certbot certonly --webroot --webroot-path . --renew-by-default --email my.email@example.com --text --agree-tos -d www.mydomain.com
```
* Once successful copy and paste the Nginx secure section entries (refer to attached config `nginx.conf`)
* Test nginx and restart the webserver
* Everything is secure at it's own domain

## Extra
* Go to Mozilla observatory and check to see what else can be done to secure your webserver