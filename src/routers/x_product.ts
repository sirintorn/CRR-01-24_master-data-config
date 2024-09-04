import { Router } from "express";
import { ProductGroup, ProductGroupsSchema } from "../models/m_product_groups";
import { ProductBase, ProductBasesSchema } from "../models/m_product_bases";
import { SubProduct, SubProductsSchema } from "../models/m_sub_products";
import { Product, ProductsSchema } from "../models/m_products";
import { CanSize, CanSizesSchema } from "../models/m_can_sizes";

export const XProductRoute = Router();

const path = '/product-mng';

XProductRoute.route(path + '/:db_version_id/search-filters').get(async (req, res) => {
   try {
    const db_version_id = req.params.db_version_id;

    const productGroupsSchema = new ProductGroupsSchema();
    const productGroups: ProductGroup[] = await productGroupsSchema.getByDBVersion(db_version_id);

    const productsSchema = new ProductsSchema();
    const products: Product[] = await productsSchema.getByDBVersion(db_version_id);

    const subProductsSchema = new SubProductsSchema();
    const subProducts: SubProduct[] = await subProductsSchema.getByDBVersion(db_version_id);

    const productBasesSchema = new ProductBasesSchema();
    const productBases: ProductBase[] = await productBasesSchema.getByDBVersion(db_version_id);

    const result = {
        productGroups: productGroups,
        products: products,
        subProducts: subProducts,
        productBases: productBases
    }

    res.status(200).send(result);
   } catch (error) {
        res.status(400).send(error);
   }
});

XProductRoute.route(path + '/:db_version_id/product-shade-configs').get(async (req, res) => {
    try {
     const db_version_id = req.params.db_version_id;
 
     const productGroupsSchema = new ProductGroupsSchema();
     const productGroups: ProductGroup[] = await productGroupsSchema.getByDBVersion(db_version_id);
 
     const productsSchema = new ProductsSchema();
     const products: Product[] = await productsSchema.getByDBVersion(db_version_id);
 
     const subProductsSchema = new SubProductsSchema();
     const subProducts: SubProduct[] = await subProductsSchema.getByDBVersion(db_version_id);
 
     const productBasesSchema = new ProductBasesSchema();
     const productBases: ProductBase[] = await productBasesSchema.getByDBVersion(db_version_id);

     const canSizesSchema = new CanSizesSchema();
     const canSizes: CanSize[] = await canSizesSchema.getByDBVersion(db_version_id); 
 
     const result = {
         productGroups: productGroups,
         products: products,
         subProducts: subProducts,
         productBases: productBases,
         canSizes: canSizes
     };
 
     res.status(200).send(result);
    } catch (error) {
         res.status(400).send(error);
    }
 });


