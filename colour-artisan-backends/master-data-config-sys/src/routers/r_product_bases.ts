import { Router } from "express";
import { ProductBase, ProductBasesSchema } from "../models/m_product_bases";
import { ProductBasePricingsSchema } from "../models/m_product_base_pricings";
import { CanSizesSchema } from "../models/m_can_sizes";


export const ProductBasesRoute = Router();

const path = '/product-bases';

//GET ALL
ProductBasesRoute.route(path).get(async (req, res) => {
    try {
        const table = new ProductBasesSchema();
        const result: ProductBase[] = await table.getAll();
        res.status(200).json(result);   
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//GET
ProductBasesRoute.route(path + '/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new ProductBasesSchema();
        const result: ProductBase = await table.get(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//CREATE
ProductBasesRoute.route(path).post(async (req, res) => {
    try {
        const data = req.body;
        const table = new ProductBasesSchema();
        const result1: any = await table.create(data);
        const db_version_id = data.product_base_id;
        const product_base_id = result1[0].id;

        //also create productBasePricingMultiple
        const csS = new CanSizesSchema();
        const canSizes = await csS.getByDBVersion(db_version_id);

        const pbpS = new ProductBasePricingsSchema();
        const items = [];
        for (let i = 0; i < canSizes.length; i++) {
            const record = canSizes[i];
            items.push(pbpS.generateRecord(db_version_id, product_base_id, record.id));
        }
        const result2 = await pbpS.createMultiple(items);

        const result = {
            product_base: result1,
            product_base_pricings: result2
        };


        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        if(error.status && error.status == 409) res.status(409).send();
        else res.status(400).send(error);
    }
});

//UPDATE
ProductBasesRoute.route(path + '/:id').put(async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const table = new ProductBasesSchema();
        const result: any = await table.update(id, data);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        if(error.status && error.status == 409) res.status(409).send();
        else res.status(400).send(error);
    }
});

//DELETE
ProductBasesRoute.route(path + '/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new ProductBasesSchema();
        const result1: any = await table.delete(id);

        //also delete productBasePricingsByProductBase
        const pbpS = new ProductBasePricingsSchema();
        const result2 = await pbpS.deleteByProductBase(id);

        const result = {
            product_base: result1,
            product_base_pricings: result2
        };

        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

// RESTPRE
ProductBasesRoute.route(path + '/:id').patch(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new ProductBasesSchema();
        const result: any = await table.restore(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});