import { Router } from "express";
import { DBConfig, DBConfigSchema } from "../models/m_db_configs";

export const DBConfigsRoute = Router();

const path = '/db-configs';

//GET ALL
DBConfigsRoute.route(path).get(async (req, res) => {
    try {
        const table = new DBConfigSchema();
        const result: DBConfig[] = await table.getAll();
        res.status(200).json(result);   
    } catch (error) {
        res.status(400).send();
    }
});

//GET
DBConfigsRoute.route(path + '/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new DBConfigSchema();
        const result: DBConfig = await table.get(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error) {
        res.status(400).send();
    }
});

//CREATE
DBConfigsRoute.route(path).post(async (req, res) => {
    try {
        const data = req.body as DBConfig;
        const table = new DBConfigSchema();
        const result: any = await table.create(data);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error) {
        res.status(400).send();
    }
});

//UPDATE
DBConfigsRoute.route(path + '/:id').put(async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const table = new DBConfigSchema();
        const result: any = await table.update(id, data);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error) {
        res.status(400).send();
    }
});

//DELETE
DBConfigsRoute.route(path + '/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new DBConfigSchema();
        const result: any = await table.delete(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error) {
        res.status(400).send();
    }
});

// RESTPRE
DBConfigsRoute.route(path + '/:id').patch(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new DBConfigSchema();
        const result: any = await table.restore(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error) {
        res.status(400).send();
    }
})