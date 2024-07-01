import { Router } from "express";
import { DBVersionSchema } from "../models/M_DBVersion";
import { PostGreSQLDB } from "../services/postgres";


export const DBVersionsRoute = Router();

const path = '/db-versions';

//GET ALL
DBVersionsRoute.route(path).get(async (req, res) => {
    try {
        const result: any = await DBVersionSchema.getAll(PostGreSQLDB.DBClient);
        res.status(200).json(result);   
    } catch (error) {
        res.status(500);
    }
});

//GET BY ID
DBVersionsRoute.route(path + '/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const result: any = await DBVersionSchema.getByID(PostGreSQLDB.DBClient, id);
        if(result != null)res.status(200).json(result);   
        else res.status(400);
    } catch (error) {
        res.status(500);
    }
});