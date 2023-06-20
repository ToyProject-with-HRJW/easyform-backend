#!/bin/sh
docker-compose up --build -d &&
yarn install &&
yarn migration:run:local &&
yarn start:local 