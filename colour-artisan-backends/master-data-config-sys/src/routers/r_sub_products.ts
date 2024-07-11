import { Router } from "express";
import { SubProduct, SubProductsSchema } from "../models/m_sub_products";

export const SubProductsRoute = Router();

const path = '/sub-products';

//GET ALL
SubProductsRoute.route(path).get(async (req, res) => {
    try {
        const table = new SubProductsSchema();
        const result: SubProduct[] = await table.getAll();
        res.status(200).json(result);   
    } catch (error) {
        res.status(400).send();
    }
});

//GET
SubProductsRoute.route(path + '/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new SubProductsSchema();
        const result: SubProduct = await table.get(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error) {
        res.status(400).send();
    }
});

//CREATE
SubProductsRoute.route(path).post(async (req, res) => {
    try {
        const data = req.body;
        const table = new SubProductsSchema();
        const result: any = await table.create(data);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error) {
        res.status(400).send();
    }
});

//UPDATE
SubProductsRoute.route(path + '/:id').put(async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const table = new SubProductsSchema();
        const result: any = await table.update(id, data);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error) {
        res.status(400).send();
    }
});

//DELETE
SubProductsRoute.route(path + '/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new SubProductsSchema();
        const result: any = await table.delete(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error) {
        res.status(400).send();
    }
});

// RESTPRE
SubProductsRoute.route(path + '/:id').patch(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new SubProductsSchema();
        const result: any = await table.restore(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error) {
        res.status(400).send();
    }
})