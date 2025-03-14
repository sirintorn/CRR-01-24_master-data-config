import { Router } from "express";
import { ProductCanSize, ProductCanSizesSchema } from "../models/m_product_can_sizes";
import { ProductsSchema } from "../models/m_products";
import { CanSizesSchema } from "../models/m_can_sizes";
import { CanUnitsSchema } from "../models/m_can_units";
import { DtoGetProductCanSize } from "../dtos/dto_get_product_can_size";


export const ProductCanSizesRoute = Router();

const path = '/product-can-sizes';

//GET ALL
ProductCanSizesRoute.route(path).get(async (req, res) => {
    try {
        const table = new ProductCanSizesSchema();
        const result: ProductCanSize[] = await table.getAll();
        res.status(200).json(result);   
    } catch (error: any) {
        res.status(400).send(error);
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
        res.status(400).send(error);
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
        if(error.status && error.status == 409) res.status(409).send();
        else res.status(400).send(error);
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
        if(error.status && error.status == 409) res.status(409).send();
        else res.status(400).send(error);
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
        res.status(400).send(error);
    }
});

// RESTORE
ProductCanSizesRoute.route(path + '/:id').patch(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new ProductCanSizesSchema();
        const result: any = await table.restore(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

///DELETE MULTIPLE
ProductCanSizesRoute.route(path + '/multiple/delete').delete(async (req, res) => {
    try {
        const ids = req.body as any[];
        const table = new ProductCanSizesSchema();
        const result: any = await table.deleteMultiple(ids);

        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

///BUSINESS LOGICS
//GET BY DB VERSION
ProductCanSizesRoute.route(path + '/by-db-version/:db_version_id').get(async (req, res) => {
    try {
        const db_version_id = req.params.db_version_id;
        
        const table = new ProductCanSizesSchema();
        const items: Array<any> = await table.getByDBVersion(db_version_id);

        const productsSchema = new ProductsSchema();
        const products = await productsSchema.getByDBVersionLite(db_version_id);

        const canSizesSchema = new CanSizesSchema();
        const canSizes = await canSizesSchema.getByDBVersion(db_version_id);

        for (let i = 0; i < items.length; i++) {
            const record = items[i];
            
            const p = products.find((value) => {
                if(value.id == record.product_id) return value;
            });

            const c = canSizes.find((value) => {
                if(value.id == record.can_size_id) return value;
            });

            record['_data'] = {
                product: p,
                can_size: c
            }   
        }

        if(items)res.status(200).json(items);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//GET BY PRODUCT
ProductCanSizesRoute.route(path + '/by-product/:product_id').get(async (req, res) => {
    try {
        const product_id = req.params.product_id;
        
        const table = new ProductCanSizesSchema();
        const items: Array<any> = await table.getByProduct(product_id);

        const productsSchema = new ProductsSchema();
        const product = await productsSchema.get(product_id);

        const canSizesSchema = new CanSizesSchema();

        for (let i = 0; i < items.length; i++) {
            const record = items[i];

            const canSizes = await canSizesSchema.get(record.can_size_id);

            record['_data'] = {
                product: product,
                can_size: canSizes
            }   
        }

        if(items)res.status(200).json(items);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//GET BY PRODUCT DTO
ProductCanSizesRoute.route(path + '/by-product/:product_id/dto').get(async (req, res) => {
    try {
        const product_id = req.params.product_id;
        
        const table = new ProductCanSizesSchema();
        const items: Array<ProductCanSize> = await table.getByProduct(product_id);

        const canSizesSchema = new CanSizesSchema();
        const canUnitsSchema = new CanUnitsSchema();

        let dtos: DtoGetProductCanSize[] = [];
        for (let i = 0; i < items.length; i++) {
            const record = items[i];

            const canSize = await canSizesSchema.get(record.can_size_id);

            const canUnit = await canUnitsSchema.get(canSize.can_unit_id);

            const dt = new DtoGetProductCanSize(record, canSize, canUnit);

            dtos.push(dt);
        }
        res.status(200).json(dtos);   
    } catch (error: any) {
        res.status(400).send(error);
    }
});

