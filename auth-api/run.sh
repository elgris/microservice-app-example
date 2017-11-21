#!/bin/bash

curl https://glide.sh/get | sh

cd /auth-api
chmod -R 755 * 
glide up
go build
