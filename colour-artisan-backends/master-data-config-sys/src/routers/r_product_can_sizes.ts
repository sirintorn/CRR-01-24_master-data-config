import { Router } from "express";
import { ProductCanSize, ProductCanSizesSchema } from "../models/m_product_can_sizes";


export const ProductCanSizesRoute = Router();

const path = '/product-can-sizes';

//GET ALL
ProductCanSizesRoute.route(path).get(async (req, res) => {
    try {
        const table = new ProductCanSizesSchema();
        const result: ProductCanSize[] = await table.getAll();
        res.status(200).json(result);   
    } catch (error: any) {
        res.status(400).send();
    }
});

//GET
ProductCanSizesRoute.route(path + '/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new ProductCanSizesSchema();
        const result: ProductCanSize = await table.get(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send();
    }
});

//CREATE
ProductCanSizesRoute.route(path).post(async (req, res) => {
    try {
        const data = req.body;
        const table = new ProductCanSizesSchema();
        const result: any = await table.create(data);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send();
    }
});

//UPDATE
ProductCanSizesRoute.route(path + '/:id').put(async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const table = new ProductCanSizesSchema();
        const result: any = await table.update(id, data);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send();
    }
});

//DELETE
ProductCanSizesRoute.route(path + '/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new ProductCanSizesSchema();
        const result: any = await table.delete(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send();
    }
});

// RESTPRE
ProductCanSizesRoute.route(path + '/:id').patch(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new ProductCanSizesSchema();
        const result: any = await table.restore(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send();
    }
})