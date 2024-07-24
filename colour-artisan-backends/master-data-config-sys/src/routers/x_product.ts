import { Router } from "express";
import { ProductGroup, ProductGroupsSchema } from "../models/m_product_groups";
import { ProductBase, ProductBasesSchema } from "../models/m_product_bases";
import { SubProduct, SubProductsSchema } from "../models/m_sub_products";

export const XProductRoute = Router();

const path = '/product-mng';

XProductRoute.route(path + '/:db_version_id').get(async (req, res) => {
   
});


