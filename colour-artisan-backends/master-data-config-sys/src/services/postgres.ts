const { Client } = require('pg');
import dotenv from 'dotenv';
dotenv.config(); //config to read .env file

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
