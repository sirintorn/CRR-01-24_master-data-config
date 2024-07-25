import { Router } from "express";
import { PaginationConfig, ProductShadeCode, ProductShadeCodesSchema, SearchFilters } from "../models/m_product_shade_codes";
import { ProductTintersSchema } from "../models/m_product_tinters";


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
        if(error.status && error.status == 409) res.status(409).send();
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
        if(error.status && error.status == 409) res.status(409).send();
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
            items: items,
            count: Number(count[0].count),
            searchFilters: searchFilters,
            paginationConfig: paginationConfig,
        }
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});


///DELETE MULTIPLE
ProductShadeCodesRoute.route(path + '/multiple/delete').delete(async (req, res) => {
    try {
        const ids = req.body as any[];
        const table = new ProductShadeCodesSchema();
        const result: any = await table.deleteMultiple(ids);

        const productTintersSchema = new ProductTintersSchema();
        const result2: any = await productTintersSchema.deleteByProductShadeCodesMultiple(ids);            

        const resultDone = {
            _productShadeCodes: result,
            _productTinters: result2
        }

        if(result)res.status(200).json(resultDone);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});