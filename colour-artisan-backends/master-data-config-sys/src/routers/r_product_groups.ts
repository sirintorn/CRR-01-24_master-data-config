import { Router } from "express";
import { ProductGroup, ProductGroupsSchema } from "../models/m_product_groups";


export const ProductGroupsRoute = Router();

const path = '/product-groups';

//GET ALL
ProductGroupsRoute.route(path).get(async (req, res) => {
    try {
        const table = new ProductGroupsSchema();
        const result: ProductGroup[] = await table.getAll();
        res.status(200).json(result);   
    } catch (error) {
        res.status(400).send();
    }
});

//GET
ProductGroupsRoute.route(path + '/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new ProductGroupsSchema();
        const result: ProductGroup = await table.get(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error) {
        res.status(400).send();
    }
});

//CREATE
ProductGroupsRoute.route(path).post(async (req, res) => {
    try {
        const data = req.body;
        const table = new ProductGroupsSchema();
        const result: any = await table.create(data);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error) {
        res.status(400).send();
    }
});

//UPDATE
ProductGroupsRoute.route(path + '/:id').put(async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const table = new ProductGroupsSchema();
        const result: any = await table.update(id, data);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error) {
        res.status(400).send();
    }
});

//DELETE
ProductGroupsRoute.route(path + '/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new ProductGroupsSchema();
        const result: any = await table.delete(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error) {
        res.status(400).send();
    }
});

// RESTPRE
ProductGroupsRoute.route(path + '/:id').patch(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new ProductGroupsSchema();
        const result: any = await table.restore(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error) {
        res.status(400).send();
    }
})