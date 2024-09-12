import { Router } from "express";

import multer from "multer";
//https://github.com/expressjs/multer

import fs from 'fs';

import { Column, Workbook } from "exceljs";
//https://github.com/exceljs/exceljs

import { IDGenerator } from "../services/id_generator";
//https://www.npmjs.com/package/@types/multer

import { ProductShadeCodesSchema } from "../models/m_product_shade_codes";
import { TinterPricing, TinterPricingsSchema } from "../models/m_tinter_pricings";
import { ProductTintersSchema } from "../models/m_product_tinters";
import { ProductGroupsSchema } from "../models/m_product_groups";
import { ProductsSchema } from "../models/m_products";
import { SubProductsSchema } from "../models/m_sub_products";
import { ProductBasesSchema } from "../models/m_product_bases";
import { CanSize, CanSizesSchema } from "../models/m_can_sizes";
import { DBConfigsSchema } from "../models/m_db_configs";
import { CanUnit, CanUnitsSchema } from "../models/m_can_units";
import { ProductCanSizesSchema } from "../models/m_product_can_sizes";
import { ProductBasePricingsSchema } from "../models/m_product_base_pricings";
import { GeneralPricingsSchema } from "../models/m_general_pricings";
import { DBVersionsSchema } from "../models/m_db_versions";
import { DBImporter } from "../services/db_importer";
import { DB } from "../../db/db";
import { DBExporter } from "../services/db_exporter";
import { DBCleanser } from "../services/db_cleanser";
import { HTMLRender } from "../services/html_render";

export const XImportExport = Router();

const uploadPath = './uploads/formula_books/';
const path = '/import-export';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = IDGenerator.newFormulaBookFileName();
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});
const upload = multer({ storage: storage }).single('formula-book');


XImportExport.route(path + '/:db_version_id' + '/import').post(async function (req, res) {
    try {
        const db_version_id = req.params.db_version_id;

        const dbConfigSCH = new DBConfigsSchema();
        const canSizesSCH = new CanSizesSchema();
        const canUnitsSCH = new CanUnitsSchema();
        const generalPSCH = new GeneralPricingsSchema();
        const productBasePSCH = new ProductBasePricingsSchema();
        const basesSCH = new ProductBasesSchema();
        const prodCanSizesSCH = new ProductCanSizesSchema();
        const groupsSCH = new ProductGroupsSchema();
        const shadesSCH = new ProductShadeCodesSchema();
        const prodTinterSCH = new ProductTintersSchema();
        const productsSCH = new ProductsSchema();
        const subProdSCH = new SubProductsSchema();
        const tinterPSCH = new TinterPricingsSchema();

        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                res.status(400).send(HTMLRender.renderImportFailed());
            } else if (err) {
                // An unknown error occurred when uploading.
                res.status(400).send(HTMLRender.renderImportFailed());
            } else if (!req.file) {
                res.status(404).send(HTMLRender.renderImportNotFound());
            } else {
                // Everything went fine.
                res.status(200).send(HTMLRender.renderImportCompleted());//.json(result);
                setTimeout(async () => {
                    await fs.unlinkSync(req.file?.path || '');
                }, (3 * 60 * 1000)); //file will be deleted after 3 minutes

                const workbook = new Workbook();
                await workbook.xlsx.readFile(req.file?.path || '');

                //#0
                //clear DB
                await DBCleanser.clearDB(db_version_id,
                    dbConfigSCH,
                    canSizesSCH,
                    canUnitsSCH,
                    generalPSCH,
                    productBasePSCH,
                    basesSCH,
                    prodCanSizesSCH,
                    groupsSCH,
                    shadesSCH,
                    prodTinterSCH,
                    productsSCH,
                    subProdSCH,
                    tinterPSCH
                );

                //#1
                //can-units
                const can_units: CanUnit[] = await DBImporter.computeSheet_3(workbook, db_version_id, canUnitsSCH);

                //#2
                //can-sizes
                const can_sizes: CanSize[] = await DBImporter.computeSheet_4(workbook, db_version_id, canSizesSCH, can_units);

                //#3
                //tinter-pricings
                const tinter_pricings: TinterPricing[] = await DBImporter.computeSheet_2(workbook, db_version_id, tinterPSCH);

                //#4
                //prod-shades and prod-tinters
                const shadeResults: any = await DBImporter.computeSheet_1(
                    workbook, 
                    db_version_id,
                    can_sizes,
                    tinter_pricings,
                    groupsSCH,
                    productsSCH,
                    subProdSCH,
                    basesSCH,
                    shadesSCH,
                    prodTinterSCH
                );

                const product_groups = shadeResults.product_groups;
                const products = shadeResults.products;
                const product_bases = shadeResults.product_bases;
                const sub_products = shadeResults.sub_products;
                const shades = shadeResults.shades;
                
                //#5
                //prod-can-sizes
                const product_can_sizes = await DBImporter.computeSheet_5(
                    workbook, 
                    db_version_id, 
                    products, 
                    can_sizes,
                    prodCanSizesSCH,
                    productsSCH,
                    product_groups
                );

                //#6
                //prod-base-pricings
                const product_base_pricings = await DBImporter.computeSheet_6(
                    workbook, 
                    db_version_id,
                    product_bases,
                    can_sizes,
                    productBasePSCH,
                    productsSCH,
                    basesSCH,
                    products,
                    product_groups
                );

                //#7
                //gen-pricings
                const general_pricings = await DBImporter.computeSheet_7(
                    workbook, 
                    db_version_id,
                    can_sizes,
                    generalPSCH
                );

                //NON
                //db-version
                const db_version = await DBImporter.computeSheet_8(workbook);

                await DBImporter.batchUpFromShades(shadesSCH, prodTinterSCH, shades);

                const result = {
                    db: db_version_id,
                    can_units: can_units,
                    can_sizes: can_sizes,
                    tinter_pricings: tinter_pricings,
                    product_groups: product_groups,
                    products: products,
                    product_bases: product_bases,
                    product_can_sizes: product_can_sizes,
                    product_base_pricings: product_base_pricings,
                    general_pricings: general_pricings,
                    db_version: db_version
                };
            }
        });
    } catch (error: any) {
        res.status(400).send(error);
    }
});

XImportExport.route(path + '/:db_version_id' + '/export').get(async (req, res) => {
    try {
        const db_version_id = req.params.db_version_id;

        const dbVersionSCH = new DBVersionsSchema();
        const dbVersion = await dbVersionSCH.get(db_version_id);

        const dbConfigSCH = new DBConfigsSchema();
        const dbConfig = await dbConfigSCH.get(db_version_id);

        const tintersSCH = new TinterPricingsSchema();
        const tinters = await tintersSCH.getByDBVersion(db_version_id);

        const shadeSCH = new ProductShadeCodesSchema();
        const shades = await shadeSCH.getByDBVersion(db_version_id);

        const prodTinterSCH = new ProductTintersSchema();

        const groupsSCH = new ProductGroupsSchema();
        const groups = await groupsSCH.getByDBVersionLite(db_version_id);

        const productsSCH = new ProductsSchema();
        const products = await productsSCH.getByDBVersionLite(db_version_id);

        const subProdSCH = new SubProductsSchema();
        const subProds = await subProdSCH.getByDBVersionLite(db_version_id);

        const basesSCH = new ProductBasesSchema();
        const bases = await basesSCH.getByDBVersionLite(db_version_id);

        const canSizesSCH = new CanSizesSchema();
        const canSizes = await canSizesSCH.getByDBVersion(db_version_id);

        const canUnitsSCH = new CanUnitsSchema();
        const canUnits = await canUnitsSCH.getByDBVersion(db_version_id);

        const prodCanSizesSCH = new ProductCanSizesSchema();
        const productCanSizes = await prodCanSizesSCH.getByDBVersion(db_version_id);

        const productBasePSCH = new ProductBasePricingsSchema();
        const productBasePricings = await productBasePSCH.getByDBVersion(db_version_id);

        const generalPSCH = new GeneralPricingsSchema();
        const generalPricings = await generalPSCH.getByDBVersion(db_version_id);

        const workbook = new Workbook();
        workbook.creator = 'Me';
        workbook.lastModifiedBy = 'Me';
        workbook.created = new Date();
        workbook.modified = new Date();
        workbook.lastPrinted = new Date();
        workbook.views = [
            {
                x: 0, y: 0, width: 30000, height: 20000,
                firstSheet: 0, activeTab: 0, visibility: 'visible'
            }
        ];

        await DBExporter.buildSheet_1(workbook, tinters, shades, prodTinterSCH, groups, products, subProds, bases, canSizes);
        await DBExporter.buildSheet_2(workbook, tinters, dbConfig);
        await DBExporter.buildSheet_3(workbook, canUnits);
        await DBExporter.buildSheet_4(workbook, canUnits, canSizes);
        await DBExporter.buildSheet_5(workbook, productCanSizes, products, canSizes);
        await DBExporter.buildSheet_6(workbook, productBasePricings, dbConfig, products, bases, canSizes);
        await DBExporter.buildSheet_7(workbook, generalPricings, canSizes);
        await DBExporter.buildSheet_8(workbook, dbVersion);

        //Prepare to download
        const filePath = uploadPath + "FormulaBook-" + dbVersion.name + "-(FLO-1)" + IDGenerator.newFormulaBookFileName();
        await workbook.xlsx.writeFile(filePath);
        res.status(200).download(filePath);

        //file will be deleted after 1 minutes
        setTimeout(async () => {
            await fs.unlinkSync(filePath);
        }, (1 * 60 * 1000));
    } catch (error: any) {
        res.status(400).send(error);
    }
});

XImportExport.route(path + '/:db_version_id' + '/cleanse').delete(async (req, res) => {
    try {
        const db_version_id = req.params.db_version_id;

        const dbConfigSCH = new DBConfigsSchema();
        const canSizesSCH = new CanSizesSchema();
        const canUnitsSCH = new CanUnitsSchema();
        const generalPSCH = new GeneralPricingsSchema();
        const productBasePSCH = new ProductBasePricingsSchema();
        const basesSCH = new ProductBasesSchema();
        const prodCanSizesSCH = new ProductCanSizesSchema();
        const groupsSCH = new ProductGroupsSchema();
        const shadesSCH = new ProductShadeCodesSchema();
        const prodTinterSCH = new ProductTintersSchema();
        const productsSCH = new ProductsSchema();
        const subProdSCH = new SubProductsSchema();
        const tinterPSCH = new TinterPricingsSchema();

        //clear DB
        await DBCleanser.clearDB(db_version_id,
            dbConfigSCH,
            canSizesSCH,
            canUnitsSCH,
            generalPSCH,
            productBasePSCH,
            basesSCH,
            prodCanSizesSCH,
            groupsSCH,
            shadesSCH,
            prodTinterSCH,
            productsSCH,
            subProdSCH,
            tinterPSCH
        );

        res.status(200).send();
    } catch (error) {
        res.status(400).send();
    }
});