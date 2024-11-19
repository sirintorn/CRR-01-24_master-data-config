
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

# DOCKET NETWORK TABLE
172.19.0.2:5432 = Postgres
172.19.0.3:4000 = MasterDataConfig
172.19.0.4:4100 = History
172.19.0.5:4200 = MachineMng
172.19.0.6:4300 = UserMng
172.19.0.7:4400 = SystemMng