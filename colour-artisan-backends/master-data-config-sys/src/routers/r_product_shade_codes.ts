import { Router } from "express";
import { ProductShadeCode, ProductShadeCodesSchema } from "../models/m_product_shade_codes";


export const ProductShadeCodesRoute = Router();

const path = '/product-shade-codes';

//GET ALL
ProductShadeCodesRoute.route(path).get(async (req, res) => {
    try {
        const table = new ProductShadeCodesSchema();
        const result: ProductShadeCode[] = await table.getAll();
        res.status(200).json(result);   
    } catch (error) {
        res.status(400).send();
    }
});

//GET
ProductShadeCodesRoute.route(path + '/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new ProductShadeCodesSchema();
        const result: ProductShadeCode = await table.get(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error) {
        res.status(400).send();
    }
});

//CREATE
ProductShadeCodesRoute.route(path).post(async (req, res) => {
    try {
        const data = req.body;
        const table = new ProductShadeCodesSchema();
        const result: any = await table.create(data);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error) {
        res.status(400).send();
    }
});

//UPDATE
ProductShadeCodesRoute.route(path + '/:id').put(async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const table = new ProductShadeCodesSchema();
        const result: any = await table.update(id, data);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error) {
        res.status(400).send();
    }
});

//DELETE
ProductShadeCodesRoute.route(path + '/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new ProductShadeCodesSchema();
        const result: any = await table.delete(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error) {
        res.status(400).send();
    }
});