//package requires
//EXPRESS: $ npm install express --save
//SWAGGER UI: $ npm install swagger-ui-dist --save
//POSTGRES: $ npm install pg --save 
//DOTENV: $ npm install dotenv
//TYPESCRIPT: $ npm i -D typescript @types/express @types/node
//NODEMON: $ npm i -D nodemon ts-node
//KNEX (SQL Schema Builder): npm install knex --save

import express from 'express';
import dotenv from 'dotenv';
import { PostGreSQLDB } from './services/postgres';
import { routes } from './routers';

const app = express();

app.use(express.json()); // parses incoming requests with JSON payloads
app.use(express.urlencoded({extended: true})); // parses incoming requests with urlencoded payloads

const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();
app.use(express.static(pathToSwaggerUi))


dotenv.config(); //config to read .env file
const NAME = process.env.NAME as string;
const PORT = process.env.PORT;
const API = process.env.API as string;

async function onStart(){
    try {
        console.log(`Server running on port ${PORT} - Project: ${NAME}`);
        await PostGreSQLDB.DBClient.connectDB();   
    } catch (error) {
        console.log(error);
    }
}

app.listen(PORT, onStart);
app.use(API, routes);

