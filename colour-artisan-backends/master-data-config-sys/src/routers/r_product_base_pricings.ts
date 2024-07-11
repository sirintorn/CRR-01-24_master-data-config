import { Router } from "express";
import { ProductBasePricing, ProductBasePricingsSchema } from "../models/m_product_base_pricings";
;

export const ProductBasePricingsRoute = Router();

const path = '/product-base-pricings';

//GET ALL
ProductBasePricingsRoute.route(path).get(async (req, res) => {
    try {
        const table = new ProductBasePricingsSchema();
        const result: ProductBasePricing[] = await table.getAll();
        res.status(200).json(result);   
    } catch (error) {
        res.status(400).send();
    }
});

//GET
ProductBasePricingsRoute.route(path + '/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new ProductBasePricingsSchema();
        const result: ProductBasePricing = await table.get(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error) {
        res.status(400).send();
    }
});

//CREATE
ProductBasePricingsRoute.route(path).post(async (req, res) => {
    try {
        const data = req.body;
        const table = new ProductBasePricingsSchema();
        const result: any = await table.create(data);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error) {
        res.status(400).send();
    }
});

//UPDATE
ProductBasePricingsRoute.route(path + '/:id').put(async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const table = new ProductBasePricingsSchema();
        const result: any = await table.update(id, data);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error) {
        res.status(400).send();
    }
});

//DELETE
ProductBasePricingsRoute.route(path + '/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new ProductBasePricingsSchema();
        const result: any = await table.delete(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error) {
        res.status(400).send();
    }
});

// RESTPRE
ProductBasePricingsRoute.route(path + '/:id').patch(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new ProductBasePricingsSchema();
        const result: any = await table.restore(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error) {
        res.status(400).send();
    }
})