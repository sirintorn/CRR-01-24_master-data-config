import { Router } from "express";
import { TinterPricing, TinterPricingsSchema } from "../models/m_tinter_pricings";

export const TinterPricingsRoute = Router();

const path = '/tinter-pricings';

//GET ALL
TinterPricingsRoute.route(path).get(async (req, res) => {
    try {
        const table = new TinterPricingsSchema();
        const result: TinterPricing[] = await table.getAll();
        res.status(200).json(result);   
    } catch (error) {
        res.status(400).send();
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
    } catch (error) {
        res.status(400).send();
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
    } catch (error) {
        res.status(400).send();
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
    } catch (error) {
        res.status(400).send();
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
    } catch (error) {
        res.status(400).send();
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
    } catch (error) {
        res.status(400).send();
    }
})