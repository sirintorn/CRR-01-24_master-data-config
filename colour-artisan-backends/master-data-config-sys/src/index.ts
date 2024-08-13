//package requires
//EXPRESS: $ npm install express --save
//SWAGGER UI: $ npm install swagger-ui-dist --save
//              $ npm i swagger-ui-express swagger-jsdoc
//POSTGRES: $ npm install pg --save 
//DOTENV: $ npm install dotenv
//TYPESCRIPT: $ npm i -D typescript @types/express @types/node
//NODEMON: $ npm i -D nodemon ts-node
//KNEX: (SQL Schema Builder): npm install knex --save
//CUSTOM UUID: $ npm i custom-uuid

import express, { Request } from 'express';
import dotenv from 'dotenv';
import { routes } from './routers';
import { CONFIGS } from './configs/configs';

const app = express();


import cors from 'cors';
//app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));
app.use(cors<Request>());
//var cors = require('cors');
//app.use(cors());
//const allowedOrigins = ['http://localhost:3000'];
/*const options: cors.CorsOptions = {
  origin: allowedOrigins
};*/
//add cors allowance
//app.use(cors(options));


app.use(express.json()); // parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // parses incoming requests with urlencoded payloads

//ALLOW GETTING CLIENT'S IP ADDRESS
app.set('trust proxy', true);

dotenv.config(); //config to read .env file
const NAME = process.env.NAME as string;
const API = process.env.API as string;
const API_DOCS = process.env.API_DOCS as string;
const PORT = Number(process.env.PORT);

async function onStart() {
    try {
        console.log(`Server running on port ${PORT} - Project: ${NAME}`);
        //await PostGreSQLDB.DBClient.connectDB();  
        console.log('testing uuid generator', IDGenerator.newUUID(), IDGenerator.newUUID(), IDGenerator.newUUID());
    } catch (error: any) {
        console.log(error);
    }
}

import * as swaggerUI from "swagger-ui-express";
import * as swaggerJSDoc from "swagger-jsdoc";
import { IDGenerator } from './services/id_generator';

const specs = swaggerJSDoc.default(CONFIGS.swaggerOptions);

app.listen(PORT, "127.0.0.1", 4000, onStart);

//app.listen(PORT, "0.0.0.0",onStart);

//add swagger
app.use(API_DOCS, swaggerUI.serve, swaggerUI.setup(specs, {explorer: true}));



//add routers
app.use(API, routes);


