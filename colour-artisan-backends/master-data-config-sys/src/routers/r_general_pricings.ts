import { Router } from "express";
import { GeneralPricing, GeneralPricingsSchema } from "../models/m_general_pricings";
;

export const GeneralPricingRoute = Router();

const path = '/general-pricings';

//GET ALL
GeneralPricingRoute.route(path).get(async (req, res) => {
    try {
        const table = new GeneralPricingsSchema();
        const result: GeneralPricing[] = await table.getAll();
        res.status(200).json(result);   
    } catch (error: any) {
        res.status(400).send();
    }
});

//GET
GeneralPricingRoute.route(path + '/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new GeneralPricingsSchema();
        const result: GeneralPricing = await table.get(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send();
    }
});

//CREATE
GeneralPricingRoute.route(path).post(async (req, res) => {
    try {
        const data = req.body;
        const table = new GeneralPricingsSchema();
        const result: any = await table.create(data);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send();
    }
});

//UPDATE
GeneralPricingRoute.route(path + '/:id').put(async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const table = new GeneralPricingsSchema();
        const result: any = await table.update(id, data);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send();
    }
});

//DELETE
GeneralPricingRoute.route(path + '/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new GeneralPricingsSchema();
        const result: any = await table.delete(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send();
    }
});

// RESTPRE
GeneralPricingRoute.route(path + '/:id').patch(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new GeneralPricingsSchema();
        const result: any = await table.restore(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send();
    }
})