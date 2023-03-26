#!/bin/sh
docker-compose build && 
docker-compose up -d &&
yarn install && 
yarn start:local 