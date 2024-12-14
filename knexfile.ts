import type { Knex } from "knex";
import dotenv from 'dotenv';

dotenv.config();

//to migrate run $ knex migrate:latest
//ro rollback run $ knex migrate:rollback

// Update with your config settings.
const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './db/migrations'
    }
  },
  lan:{
    client: 'pg',
    connection: process.env.DB_LAN_URL,
    migrations: {
      directory: './db/migrations'
    }
  },
  staging: {
    client: 'pg',
    connection: process.env.DB_STAG_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DB_PROD_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations'
    }
  },
  production_cn: {
    client: 'pg',
    connection: process.env.DB_PROD_CN_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations'
    }
  }

};

module.exports = config;
export default config;
