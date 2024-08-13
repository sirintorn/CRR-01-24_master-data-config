
## Initialize
$ npm install
$ npm install -g knex
$ npm install -g ts-node


## Migrate DB to your Localhost
$ knex migrate:latest

## Migrate DB to Staging (EC2)
$ NODE_ENV=staging knex migrate:latest


## Run on Localhost
$ npm start

## Run on Staging
$ npm run staging