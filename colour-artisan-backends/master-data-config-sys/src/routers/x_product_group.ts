import { Router } from "express";
import { ProductGroup, ProductGroupsSchema } from "../models/m_product_groups";
import { ProductBase, ProductBasesSchema } from "../models/m_product_bases";
import { SubProduct, SubProductsSchema } from "../models/m_sub_products";

export const XProductGroupRoute = Router();

const path = '/product-group-mng';

XProductGroupRoute.route(path + '/:db_version_id').get(async (req, res) => {
    try {
        const db_version_id = req.params.db_version_id;
        const productGroupsSchema = new ProductGroupsSchema()
        const productBasesSchema = new ProductBasesSchema()
        const subProductsSchema = new SubProductsSchema()

        const productGroups: Array<ProductGroup> = await productGroupsSchema.getByDBVersion(db_version_id);
        const productBases: Array<ProductBase> = await productBasesSchema.getByDBVersion(db_version_id);
        const subProducts: Array<SubProduct> = await subProductsSchema.getByDBVersion(db_version_id);
        const result = {
            productGroups: productGroups,
            productBases: productBases,
            subProducts: subProducts
        };
        res.status(200).json(result);   
    } catch (error) {
        res.status(400).send();
    }
});


