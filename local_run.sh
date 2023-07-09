#!/bin/sh
docker-compose up --build -d &&
yarn install &&
yarn start:local 