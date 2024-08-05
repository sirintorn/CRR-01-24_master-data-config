import { Router } from "express";
import { DBConfigsSchema } from "../models/m_db_configs";
import { DBVersionsSchema } from "../models/m_db_versions";
import { CanUnitsSchema } from "../models/m_can_units";
import { CanSizesSchema } from "../models/m_can_sizes";
import { ProductGroupsSchema } from "../models/m_product_groups";
import { ProductsSchema } from "../models/m_products";
import { SubProductsSchema } from "../models/m_sub_products";
import { ProductBasesSchema } from "../models/m_product_bases";
import { ProductCanSizesSchema } from "../models/m_product_can_sizes";
import { TinterPricingsSchema } from "../models/m_tinter_pricings";
import { GeneralPricingsSchema } from "../models/m_general_pricings";
import { ProductBasePricingsSchema } from "../models/m_product_base_pricings";
import { ProductShadeCodesSchema } from "../models/m_product_shade_codes";
import { ProductTintersSchema } from "../models/m_product_tinters";

export const AppRoute = Router();

const path = '/app';
const appPaths = {
    db: '/db',
    online: '/online'
};

//STAY ONLINE
AppRoute.route(path + appPaths.online).post(async (req, res) => {
    try {
        const body = req.body;

        const result = {
            status: 'online',
            at: (new Date()).toLocaleTimeString(),
            address: req.socket.remoteAddress,
            using: body
        }

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
})

//GET DB Version & Config, also ALL Related Data except ProductShadeCodes
AppRoute.route(path + appPaths.db + '/:db_version_id').get(async (req, res) => {
    try {
        const db_version_id = req.params.db_version_id;

        const dbVersionsSCH = new DBVersionsSchema();
        const dbVersion = await dbVersionsSCH.get(db_version_id);

        const dbConfigsSCH = new DBConfigsSchema();
        const dbConfig = await dbConfigsSCH.get(db_version_id);

        const canUnitsSCH = new CanUnitsSchema();
        const canUnits = await canUnitsSCH.getByDBVersion(db_version_id);

        const canSizesSCH = new CanSizesSchema();
        const canSizes = await canSizesSCH.getByDBVersion(db_version_id);

        const groupsSCH = new ProductGroupsSchema();
        const groups = await groupsSCH.getByDBVersionLite(db_version_id);

        const productsSCH = new ProductsSchema();
        const products = await productsSCH.getByDBVersionLite(db_version_id);

        const subProductsSCH = new SubProductsSchema();
        const subProducts = await subProductsSCH.getByDBVersionLite(db_version_id);

        const basesSCH = new ProductBasesSchema();
        const bases = await basesSCH.getByDBVersionLite(db_version_id);

        const prodCanSizesSCH = new ProductCanSizesSchema();
        const prodCanSizes = await prodCanSizesSCH.getByDBVersion(db_version_id);

        const tinterPSCH = new TinterPricingsSchema();
        const tinters = await tinterPSCH.getByDBVersion(db_version_id);

        const generalPSCH = new GeneralPricingsSchema();
        const generals = await generalPSCH.getByDBVersion(db_version_id);

        const pbasesPSCH = new ProductBasePricingsSchema();
        const pbases = await pbasesPSCH.getByDBVersion(db_version_id);

        const result = {
            db: dbVersion,
            config: dbConfig,
            cans: {
                units: canUnits,
                sizes: canSizes,
            },
            mixed: {
                groups: groups,
                products: products,
                sub_products: subProducts,
                bases: bases,
                product_can_sizes: prodCanSizes
            },
            pricings: {
                tinters: tinters,
                generals: generals,
                product_bases: pbases
            },
        };
        res.status(200).json(result);   
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//GET PRODUCT SHADES & PRODUCT TINTERS DATA
AppRoute.route(path + appPaths.db + '/:db_version_id' + '/product-shades').get(async (req, res) => {
    try {
        const db_version_id = req.params.db_version_id;

        const shadesSCH = new ProductShadeCodesSchema();
        const shades = await shadesSCH.getByDBVersion(db_version_id);

        const tintersSCH = new ProductTintersSchema();
        const tinters = await tintersSCH.getByDBVersion(db_version_id);

        const result = {
            shades: shades,
            tinters: tinters
        };
        res.status(200).json(result);   
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//REDEEM TOKEN AS STAYING ONLINE EVERY 5 MINUTES
AppRoute.route(path + appPaths.db + '/redeem').get(async (req, res) => {
    try {
        const result = {
            
        };
        res.status(200).json(result);   
    } catch (error: any) {
        res.status(400).send(error);
    }
});