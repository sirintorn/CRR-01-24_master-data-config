import { Router } from "express";
import { GeneralPricing, GeneralPricingsSchema } from "../models/m_general_pricings";
import { CanSize, CanSizesSchema } from "../models/m_can_sizes";
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
        res.status(400).send(error);
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
        res.status(400).send(error);
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
        if(error.status && error.status == 409) res.status(409).send();
        res.status(400).send(error);
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
        if(error.status && error.status == 409) res.status(409).send();
        res.status(400).send(error);
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
        res.status(400).send(error);
    }
});

// RESTORE
GeneralPricingRoute.route(path + '/:id').patch(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new GeneralPricingsSchema();
        const result: any = await table.restore(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//BUSINESS LOGICS
//GET BY DB VERSION
GeneralPricingRoute.route(path + '/by-db-version/:db_version_id').get(async (req, res) => {
    try {
        const db_version_id = req.params.db_version_id;
        
        const table = new GeneralPricingsSchema();
        const items: Array<any> = await table.getByDBVersion(db_version_id);

        const canSizesSchema = new CanSizesSchema();

        for (let i = 0; i < items.length; i++) {
            const record = items[i];
            const canSize = await canSizesSchema.get(record.can_size_id);
            record['_data'] = {
                can_size: canSize
            }
        }

        if(items)res.status(200).json(items);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});