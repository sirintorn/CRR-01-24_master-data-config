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
    } catch (error: any) {
        res.status(400).send(error);
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
    } catch (error: any) {
        res.status(400).send(error);
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
    } catch (error: any) {
        if(error.status && error.status == 409) res.status(409).send();
        else res.status(400).send(error);
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
    } catch (error: any) {
        if(error.status && error.status == 409) res.status(409).send();
        else res.status(400).send(error);
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
    } catch (error: any) {
        res.status(400).send(error);
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
    } catch (error: any) {
        res.status(400).send(error);
    }
})