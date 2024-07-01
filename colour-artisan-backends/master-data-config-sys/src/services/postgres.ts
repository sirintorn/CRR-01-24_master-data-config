const { Client } = require('pg');
import dotenv from 'dotenv';
dotenv.config(); //config to read .env file

export const knexPg = require('knex')({
    client: 'pg',
    connection: {
        //connectionString: config.DATABASE_URL,
        host: process.env.DB_HOST as string,
        port: process.env.DB_PORT as string,
        user: process.env.DB_USER as string,
        database: process.env.DB_DATABASE as string,
        password: process.env.DB_PASSWORD as string,
    },
    pool: {
        afterCreate: function (conn: any, done: any) {
            // in this example we use pg driver's connection API
            conn.query('SET timezone="UTC";', function (err: any) {
                if (err) {
                    // first query failed,
                    // return error and don't try to make next query
                    done(err, conn);
                } else {
                    // do the second query...
                    conn.query('SELECT set_limit(0.01);', function (err: any) {
                        // if err is not falsy,
                        //  connection is discarded from pool
                        // if connection aquire was triggered by a
                        // query the error is passed to query promise
                        done(err, conn);
                    });
                }
            });
        },
    },
    searchPath: ['knex', 'public'],
});

export class PostGreSQLDB {
    host: string;
    port: string;
    database: string;
    user: string;
    password: string;
    schema: string;

    client: any;
    isConnected: boolean = false;

    constructor(host: string, port: string, database: string, user: string, password: string, schema: string) {
        this.host = host;
        this.port = port;
        this.database = database;
        this.user = user;
        this.password = password;
        this.schema = schema

        this.client = new Client({
            user: user,
            password: password,
            host: host,
            port: port,
            database: database,
            schema: schema
        });
    }

    async connectDB() {
        try {
            await this.client
                .connect();
            console.log(`Connected to PostgreSQL database; host=${this.host}`);
            this.isConnected = true;
        } catch (error) {
            console.error('Error connecting to PostgreSQL database', error);
            this.isConnected = false;
        }
    }


    static DBClient = new PostGreSQLDB(
        process.env.DB_HOST as string,
        process.env.DB_PORT as string,
        process.env.DB_DATABASE as string,
        process.env.DB_USER as string,
        process.env.DB_PASSWORD as string,
        process.env.DB_SCHEMA as string
    );

}
