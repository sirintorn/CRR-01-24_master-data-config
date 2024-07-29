import { Router } from "express";
import { ProductBasePricing, ProductBasePricingsSchema } from "../models/m_product_base_pricings";
import { CanSizesSchema } from "../models/m_can_sizes";
import { ProductBasesSchema } from "../models/m_product_bases";
import { ProductsSchema } from "../models/m_products";
;

export const ProductBasePricingsRoute = Router();

const path = '/product-base-pricings';

//GET ALL
ProductBasePricingsRoute.route(path).get(async (req, res) => {
    try {
        const table = new ProductBasePricingsSchema();
        const result: ProductBasePricing[] = await table.getAll();
        res.status(200).json(result);   
    } catch (error: any) {
        res.status(400).send(error);
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
    } catch (error: any) {
        res.status(400).send(error);
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
    } catch (error: any) {
        if(error.status && error.status == 409) res.status(409).send();
        res.status(400).send(error);
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
    } catch (error: any) {
        if(error.status && error.status == 409) res.status(409).send();
        res.status(400).send(error);
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
    } catch (error: any) {
        res.status(400).send(error);
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
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//BUSINESS LOGICS
//GET BY DB VERSION
ProductBasePricingsRoute.route(path + '/by-db-version/:db_version_id').get(async (req, res) => {
    try {
        const db_version_id = req.params.db_version_id;
        
        const table = new ProductBasePricingsSchema();
        const items: Array<any> = await table.getByDBVersion(db_version_id);

        const productBasesSchema = new ProductBasesSchema();

        const productsSchema = new ProductsSchema();
        const products = await productsSchema.getByDBVersionLite(db_version_id);
        const canSizesSchema = new CanSizesSchema();
        const canSizes = await canSizesSchema.getByDBVersion(db_version_id);

        for (let i = 0; i < items.length; i++) {
            const record = items[i];

            const productBase = await productBasesSchema.get(record.product_base_id);
            const product = products.find((value) => {
                if(value.id == productBase.product_id) return value;
            });

            const canSize = canSizes.find((value) => {
                if(value.id == record.can_size_id) return value;
            });

            record['_data'] = {
                product_base: productBase,
                product: product,
                can_size: canSize
            };
        }

        if(items)res.status(200).json(items);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});