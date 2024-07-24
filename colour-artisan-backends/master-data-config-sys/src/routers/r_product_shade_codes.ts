import { Router } from "express";
import { PaginationConfig, ProductShadeCode, ProductShadeCodesSchema, SearchFilters } from "../models/m_product_shade_codes";


export const ProductShadeCodesRoute = Router();

const path = '/product-shade-codes';

//GET ALL
ProductShadeCodesRoute.route(path).get(async (req, res) => {
    try {
        const table = new ProductShadeCodesSchema();
        const result: ProductShadeCode[] = await table.getAll();
        res.status(200).json(result);   
    } catch (error: any) {
        res.status(400).send(error);
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
    } catch (error: any) {
        res.status(400).send(error);
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
    } catch (error: any) {
        res.status(400).send(error);
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
    } catch (error: any) {
        res.status(400).send(error);
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
    } catch (error: any) {
        res.status(400).send(error);
    }
});

// RESTORE
ProductShadeCodesRoute.route(path + '/:id').patch(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new ProductShadeCodesSchema();
        const result: any = await table.restore(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
})



///BUSINESS LOGICS

//GET BY DB VERSION FILTERED
ProductShadeCodesRoute.route(path + '/by-db-version/:db_version_id').get(async (req, res) => {
    try {
        const db_version_id = req.params.db_version_id;
        const keywords = req.query.keyw || '';
        const group = req.query.group || '';
        const product = req.query.prod || '';
        const sub_product = req.query.subp || '';
        const base = req.query.base || '';
        
        const searchFilters: SearchFilters = {
            keywords: keywords as string,
            product_group_id: group as string,
            product_id: product as string,
            sub_product_id: sub_product as string,
            product_base_id: base as string
        }

        const limit = req.query.limit || null;
        const offset = req.query.offset || null;

        const paginationConfig: PaginationConfig = {
            limit: Number(limit),
            offset: Number(offset)
        }

        const table = new ProductShadeCodesSchema();
        const items: ProductShadeCode[]  = await table.getByDBVersionFiltered(db_version_id, searchFilters, paginationConfig);
        const count = await table.getByDBVersionFilteredCount(db_version_id, searchFilters);

        const result = {
            searchFilters: searchFilters,
            paginationConfig: paginationConfig,
            items: items,
            count: Number(count[0].count)
        }
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});