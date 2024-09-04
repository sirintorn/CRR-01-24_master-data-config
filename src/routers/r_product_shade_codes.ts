import { Router } from "express";
import { PaginationConfig, ProductShadeCode, ProductShadeCodesSchema, SearchFilters } from "../models/m_product_shade_codes";
import { ProductTintersSchema } from "../models/m_product_tinters";
import { ProductGroupsSchema } from "../models/m_product_groups";
import { ProductsSchema } from "../models/m_products";
import { ProductBasesSchema } from "../models/m_product_bases";
import { SubProductsSchema } from "../models/m_sub_products";
import { CanSizesSchema } from "../models/m_can_sizes";
import { DtoGetShadeCode } from "../dtos/dto_get_shade_code";
import { DBVersionsSchema } from "../models/m_db_versions";


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
        else res.status(400).send(error);
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
        else res.status(400).send(error);
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
        const items: any[]  = await table.getByDBVersionFiltered(db_version_id, searchFilters, paginationConfig);
        const count = await table.getByDBVersionFilteredCount(db_version_id, searchFilters);

        const pgSchema = new ProductGroupsSchema();
        const pgs = await pgSchema.getByDBVersion(db_version_id);

        const pSchmea = new ProductsSchema();
        const ps = await pSchmea.getByDBVersion(db_version_id);

        const pbSchema = new ProductBasesSchema();
        const pbs = await pbSchema.getByDBVersion(db_version_id);

        const spSchema = new SubProductsSchema();
        const sps = await spSchema.getByDBVersion(db_version_id);
        
        const csSchema = new CanSizesSchema();
        const css = await csSchema.getByDBVersion(db_version_id);


        for (let i = 0; i < items.length; i++) {
            const record = items[i];

            const pg = pgs.find((value) => {
                if(value.id == record.product_group_id) return value;
            });

            const p = ps.find((value) => {
                if(value.id == record.product_id) return value;
            });

            const pb = pbs.find((value) => {
                if(value.id == record.product_base_id) return value;
            });

            const sp = sps.find((value) => {
                if(value.id == record.sub_product_id) return value;
            });
            
            const cs = css.find((value) => {
                if(value.id == record.can_size_id) return value;
            });

            record['_data'] = {
                product_group: pg,
                product: p,
                product_base: pb,
                sub_product: sp,
                can_size: cs
            };
        }

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


//DTO Version
ProductShadeCodesRoute.route(path + '/by-db-version/:db_version_id/dto').get(async (req, res) => {
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
        const items: any[]  = await table.getByDBVersionFiltered(db_version_id, searchFilters, paginationConfig);
        const count = await table.getByDBVersionFilteredCount(db_version_id, searchFilters);

        const dbVersionSchema = new DBVersionsSchema();
        const db = await dbVersionSchema.get(db_version_id);

        const pgSchema = new ProductGroupsSchema();
        const pgs = await pgSchema.getByDBVersion(db_version_id);

        const pSchmea = new ProductsSchema();
        const ps = await pSchmea.getByDBVersion(db_version_id);

        const pbSchema = new ProductBasesSchema();
        const pbs = await pbSchema.getByDBVersion(db_version_id);

        const spSchema = new SubProductsSchema();
        const sps = await spSchema.getByDBVersion(db_version_id);
        
        const csSchema = new CanSizesSchema();
        const css = await csSchema.getByDBVersion(db_version_id);

        const dtos = DtoGetShadeCode.parseFromArray(items, db, pgs, ps, pbs, sps, css);

        const result = {
            items: dtos,
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


//GET BY DB VERSION FILTERED X
ProductShadeCodesRoute.route(path + '/by-db-version-x/:db_version_id').get(async (req, res) => {
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

        console.log(searchFilters)

        const limit = req.query.limit || null;
        const offset = req.query.offset || null;

        const paginationConfig: PaginationConfig = {
            limit: Number(limit),
            offset: Number(offset)
        }

        const table = new ProductShadeCodesSchema();
        const result  = await table.getByDBVersionFilteredX(db_version_id, searchFilters, paginationConfig);

        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});
