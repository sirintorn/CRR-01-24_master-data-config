import { Router } from "express";
import { TinterPricing, TinterPricingsSchema } from "../models/m_tinter_pricings";
import { DtoTinterPricing } from "../dtos/dto_tinter_pricing";
import { DBConfigsSchema } from "../models/m_db_configs";

export const TinterPricingsRoute = Router();

const path = '/tinter-pricings';

//GET ALL
TinterPricingsRoute.route(path).get(async (req, res) => {
    try {
        const table = new TinterPricingsSchema();
        const result: TinterPricing[] = await table.getAll();
        res.status(200).json(result);   
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//GET
TinterPricingsRoute.route(path + '/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new TinterPricingsSchema();
        const result: TinterPricing = await table.get(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//CREATE
TinterPricingsRoute.route(path).post(async (req, res) => {
    try {
        const data = req.body;
        const table = new TinterPricingsSchema();
        const result: any = await table.create(data);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        if(error.status && error.status == 409) res.status(409).send();
        else res.status(400).send(error);
    }
});

//UPDATE
TinterPricingsRoute.route(path + '/:id').put(async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const table = new TinterPricingsSchema();
        const result: any = await table.update(id, data);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        if(error.status && error.status == 409) res.status(409).send();
        else res.status(400).send(error);
    }
});

//DELETE
TinterPricingsRoute.route(path + '/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new TinterPricingsSchema();
        const result: any = await table.delete(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

// RESTPRE
TinterPricingsRoute.route(path + '/:id').patch(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new TinterPricingsSchema();
        const result: any = await table.restore(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});


///BUSINESS LOGICS

//GET BY DB VERSION
TinterPricingsRoute.route(path + '/by-db-version/:db_version_id').get(async(req, res) => {
    try {
        const db_version_id = req.params.db_version_id;

        const table = new TinterPricingsSchema();
        const result: Array<TinterPricing> = await table.getByDBVersion(db_version_id);

        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//GET BY DB VERSION DTO
TinterPricingsRoute.route(path + '/by-db-version/:db_version_id/dto').get(async(req, res) => {
    try {
        const db_version_id = req.params.db_version_id;

        const table = new TinterPricingsSchema();
        const result: Array<TinterPricing> = await table.getByDBVersion(db_version_id);

        const dbConfigSchema = new DBConfigsSchema();
        const dbConfig = await dbConfigSchema.get(db_version_id);

        const rows: DtoTinterPricing[] = [];
        for (let i = 0; i < result.length; i++) {
            const record = result[i];
            const dt = new DtoTinterPricing(dbConfig, record);
            rows.push(dt);
        }

       res.status(200).json(rows);   
    } catch (error: any) {
        res.status(400).send(error);
    }
});