import { Router } from "express";

import multer from "multer";
//https://github.com/expressjs/multer

import fs from 'fs';

import { Column, Workbook } from "exceljs";
//https://github.com/exceljs/exceljs

import { IDGenerator } from "../services/id_generator";
//https://www.npmjs.com/package/@types/multer

import { ProductShadeCode, ProductShadeCodesSchema } from "../models/m_product_shade_codes";
import { TinterPricing, TinterPricingsSchema } from "../models/m_tinter_pricings";
import { ProductTinter, ProductTintersSchema } from "../models/m_product_tinters";
import { ProductGroup, ProductGroupsSchema } from "../models/m_product_groups";
import { Product, ProductsSchema } from "../models/m_products";
import { SubProduct, SubProductsSchema } from "../models/m_sub_products";
import { ProductBase, ProductBasesSchema } from "../models/m_product_bases";
import { CanSize, CanSizesSchema } from "../models/m_can_sizes";
import { DBConfig, DBConfigsSchema } from "../models/m_db_configs";
import { CanUnit, CanUnitsSchema } from "../models/m_can_units";
import { ProductCanSize, ProductCanSizesSchema } from "../models/m_product_can_sizes";
import { ProductBasePricing, ProductBasePricingsSchema } from "../models/m_product_base_pricings";
import { GeneralPricing, GeneralPricingsSchema } from "../models/m_general_pricings";
import { DBVersion, DBVersionsSchema } from "../models/m_db_versions";

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
                res.status(400).send(err);
            } else if (err) {
                // An unknown error occurred when uploading.
                res.status(400).send(err);
            } else {
                // Everything went fine.

                const workbook = new Workbook();
                await workbook.xlsx.readFile(req.file?.path || '');

                //#0
                //clear DB
                await clearDB(db_version_id,
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
                await computeSheet_3(workbook);

                //#2
                //can-sizes
                await computeSheet_4(workbook);

                //#3
                //tinter-pricings
                await computeSheet_2(workbook);

                //#4
                //prod-shades and prod-tinters
                await computeSheet_1(workbook);

                //#5
                //prod-can-sizes
                await computeSheet_5(workbook);

                //#6
                //prod-base-pricings
                await computeSheet_6(workbook);

                //#7
                //gen-pricings
                await computeSheet_7(workbook);

                //NON
                //db-version
                await computeSheet_8(workbook);

                const result = {
                    db: db_version_id,
                    updated_at: new Date(),
                    file: req.file,
                };
                res.status(200).json(result);
            }


            setTimeout(async () => {
                await fs.unlinkSync(req.file?.path || '');
            }, (3 * 60 * 1000)); //file will be deleted after 3 minutes
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

        await buildSheet_1(workbook, tinters, shades, prodTinterSCH, groups, products, subProds, bases, canSizes);
        await buildSheet_2(workbook, tinters, dbConfig);
        await buildSheet_3(workbook, canUnits);
        await buildSheet_4(workbook, canUnits, canSizes);
        await buildSheet_5(workbook, productCanSizes, products, canSizes);
        await buildSheet_6(workbook, productBasePricings, dbConfig, products, bases, canSizes);
        await buildSheet_7(workbook, generalPricings, canSizes);
        await buildSheet_8(workbook, dbVersion);

        //Prepare to download
        const filePath = uploadPath + "FormulaBook-" + dbVersion.name + "-(FLO-1)" + IDGenerator.newFormulaBookFileName();
        await workbook.xlsx.writeFile(filePath);
        res.status(200).download(filePath);

        //file will be deleted after 3 minutes
        setTimeout(async () => {
            await fs.unlinkSync(filePath);
        }, (3 * 60 * 1000));
    } catch (error: any) {
        res.status(400).send(error);
    }
});

async function clearDB(db_version_id: any,
    dbConfigSCH: DBConfigsSchema,
    canSizesSCH: CanSizesSchema,
    canUnitsSCH: CanUnitsSchema,
    generalPSCH: GeneralPricingsSchema,
    productBasePSCH: ProductBasePricingsSchema,
    basesSCH: ProductBasesSchema,
    prodCanSizesSCH: ProductCanSizesSchema,
    groupsSCH: ProductGroupsSchema,
    shadesSCH: ProductShadeCodesSchema,
    prodTinterSCH: ProductTintersSchema,
    productsSCH: ProductsSchema,
    subProdSCH: SubProductsSchema,
    tinterPSCH: TinterPricingsSchema
) {
    await dbConfigSCH.delete(db_version_id);
    await dbConfigSCH.create(dbConfigSCH.generateDefaultConfig(db_version_id));

    
}

async function computeSheet_1(workbook: Workbook) {
    const sheet = workbook.getWorksheet('Product');
    //Product_Group	Product	SHADE CODE	SHADE NAME	SubProduct	BASE	CANSIZE	AXX	B	C	D	E	F	I	KX	L	RH	T	V	RR	AN	Tinter15	Tinter16	Tinter17	Tinter18	Tinter19	Tinter20	Tinter21	Tinter22	Tinter23	Tinter24	Red	Green	Blue	Product_QRCode	Comment

    return sheet;
}

async function computeSheet_2(workbook: Workbook) {
    const sheet = workbook.getWorksheet('Tinter');
    //Tinter Code	Tinter Name	SG	R	G	B	Price	Tinter_QRCode (Represent Tinter Code)	Tinter_MarkUp_Price (%)	Tinter_MarkUp_Price02 (%)	Tinter_MarkUp_Price03 (%)	Default_Tinter_MarkUp_Price (%)			

    return sheet;
}

async function computeSheet_3(workbook: Workbook) {
    const sheet = workbook.getWorksheet('Can_Unit');
    //Can_Unit_ID	Name	as ml.	

    sheet?.eachRow((row, rowNum) => {
        if (rowNum !== 1) {

        }
    })

    return sheet;
}

async function computeSheet_4(workbook: Workbook) {
    const sheet = workbook.getWorksheet('Can_Size');
    //Can_Size_Id	Can_Unit_Id	Size	Display_Name	QRCode	

    return sheet;
}

async function computeSheet_5(workbook: Workbook) {
    const sheet = workbook.getWorksheet('Product_Can_Size');
    //Product	Can_Size_ID		

    return sheet;
}

async function computeSheet_6(workbook: Workbook) {
    const sheet = workbook.getWorksheet('Product_Base_Pricing');
    //Product	Base	Can_Size_ID	Price	Can_Name (For user, ignore for importing)	Base_Cansize_QRCode	MarkUp_Price01	MarkUp_Price02	MarkUp_Price03	Default_MarkUp_Price

    return sheet;
}

async function computeSheet_7(workbook: Workbook) {
    const sheet = workbook.getWorksheet('General_Pricing');
    //Can_ID	Price	MarkUp_Price01	MarkUp_Price02	MarkUp_Price03	Default_MarkUp_Price	

    return sheet;
}

async function computeSheet_8(workbook: Workbook) {
    const sheet = workbook.getWorksheet('DB_Version');
    //DB_Version_Name	DB_Version		

    return sheet;
}

async function buildSheet_1(workbook: Workbook, tinters: TinterPricing[], shades: ProductShadeCode[], prodTinterSCH: ProductTintersSchema, groups: ProductGroup[], products: Product[], subProds: SubProduct[], bases: ProductBase[], canSizes: CanSize[]) {
    const sheet = workbook.addWorksheet('Product');
    //Product_Group	Product	SHADE CODE	SHADE NAME	SubProduct	BASE	CANSIZE	AXX	B	C	D	E	F	I	KX	L	RH	T	V	RR	AN	Tinter15	Tinter16	Tinter17	Tinter18	Tinter19	Tinter20	Tinter21	Tinter22	Tinter23	Tinter24	Red	Green	Blue	Product_QRCode	Comment
    const cols1: Array<Partial<Column>> = [
        { header: 'Product_Group', key: 'product_group', width: 32 },
        { header: 'Product', key: 'product', width: 32 },
        { header: 'SHADE_CODE', key: 'shade_code', width: 16 },
        { header: 'SHADE_NAME', key: 'shade_name', width: 16 },
        { header: 'SubProduct', key: 'sub_product', width: 16 },
        { header: 'BASE', key: 'product_base', width: 48 },
        { header: 'CANSIZE', key: 'can_size', width: 16 },
    ];
    let cols2: Array<Partial<Column>> = [];
    const cols3: Array<Partial<Column>> = [
        { header: 'Red', key: 'red', width: 8 },
        { header: 'Green', key: 'green', width: 8 },
        { header: 'Blue', key: 'blue', width: 8 },
        { header: 'Product_QRCode', key: 'product_qr_code', width: 32 },
        { header: 'Comment', key: 'comment', width: 32 }
    ];

    let firstRow: any = {
        product_group: 'Product_Group',
        product: 'Product',
        shade_code: 'SHADE_CODE',
        shade_name: 'SHADE_NAME',
        sub_product: 'SubProduct',
        product_base: 'BASE',
        can_size: 'CANSIZE',
        red: 'Red',
        green: 'Green',
        blue: 'Blue',
        product_qr_code: 'Product_QRCode',
        comment: 'Comment'
    };

    for (let k = 0; k < tinters.length; k++) {
        const item = tinters[k];
        cols2.push({ header: item.tinter_code, key: item.tinter_code, width: 16 });
        firstRow[item.tinter_code] = item.tinter_code;
    }

    sheet.getRow(1).values = firstRow;

    let cols = [];
    cols.push(...cols1);
    cols.push(...cols2);
    cols.push(...cols3);

    sheet.columns = cols;

    //FETCH EACH ROWS
    for (let i = 0; i < shades.length; i++) {
        const item = shades[i];
        const prod_tinters = await prodTinterSCH.getByProductShadeCode(item.id);

        const row = sheet.getRow(i + 2);
        const gp = groups.find((val) => val.id == item.product_group_id);
        const pd = products.find((val => val.id == item.product_id));
        const sp = subProds.find((val) => val.id == item.sub_product_id);
        const pb = bases.find((val) => val.id == item.product_base_id);
        const cz = canSizes.find((val) => val.id == item.can_size_id);

        let r: any = {
            product_group: gp?.name,
            product: pd?.name,
            shade_code: item.shade_code,
            shade_name: item.shade_name,
            sub_product: sp?.name,
            product_base: pb?.name,
            can_size: cz?.can_size,
            red: item.red,
            green: item.green,
            blue: item.blue,
            product_qr_code: '',
            comment: ''
        };

        for (let y = 0; y < prod_tinters.length; y++) {
            const tint = prod_tinters[y];
            r[tint.tinter_code] = tint.amount;
        }

        row.values = r;
    }

    return sheet;
}

async function buildSheet_2(workbook: Workbook, tinters: TinterPricing[], dbConfig: DBConfig) {
    const sheet = workbook.addWorksheet('Tinter');
    //Tinter Code	Tinter Name	SG	R	G	B	Price	Tinter_QRCode (Represent Tinter Code)	Tinter_MarkUp_Price (%)	Tinter_MarkUp_Price02 (%)	Tinter_MarkUp_Price03 (%)	Default_Tinter_MarkUp_Price (%)			
    const cols1: Array<Partial<Column>> = [
        { header: 'Tinter Code', key: 'tinter_code', width: 16 },
        { header: 'Tinter Name', key: 'tinter_name', width: 16 },
        { header: 'SG', key: 'sg', width: 8 },
        { header: 'R', key: 'r', width: 8 },
        { header: 'G', key: 'g', width: 8 },
        { header: 'B', key: 'b', width: 8 },
        { header: 'Price', key: 'price', width: 16 },
        { header: 'Tinter_QRCode (Represent Tinter Code)', key: 'qrcode', width: 32 },
        { header: 'Tinter_MarkUp_Price (%)', key: 'markup_price_01', width: 28 },
        { header: 'Tinter_MarkUp_Price02 (%)', key: 'markup_price_02', width: 28 },
        { header: 'Tinter_MarkUp_Price03 (%)', key: 'markup_price_03', width: 28 },
        { header: 'Default_Tinter_MarkUp_Price (%)', key: 'default_markup_price', width: 28 },
    ];
    sheet.columns = cols1;

    sheet.getRow(1).values = {
        tinter_code: 'Tinter Code',
        tinter_name: 'Tinter Name',
        sg: 'SG',
        r: 'R',
        g: 'G',
        b: 'B',
        price: 'Price',
        qrcode: 'Tinter_QRCode (Represent Tinter Code)',
        markup_price_01: 'Tinter_MarkUp_Price (%)',
        markup_price_02: 'Tinter_MarkUp_Price02 (%)',
        markup_price_03: 'Tinter_MarkUp_Price03 (%)',
        default_markup_price: 'Default_Tinter_MarkUp_Price (%)'
    };

    for (let i = 0; i < tinters.length; i++) {
        const item = tinters[i];
        const r = {
            tinter_code: item.tinter_code,
            tinter_name: item.tinter_name,
            sg: item.sg,
            r: item.red,
            g: item.green,
            b: item.blue,
            price: item.price,
            qrcode: null,
            markup_price_01: item.mark_up_price_01,
            markup_price_02: item.mark_up_price_02,
            markup_price_03: item.mark_up_price_03,
            default_markup_price: i == 0 ? dbConfig.tinter_price_markup_price : null
        };
        sheet.getRow(i + 2).values = r;
    }

    return sheet;
}

async function buildSheet_3(workbook: Workbook, canUnits: CanUnit[]) {
    const sheet = workbook.addWorksheet('Can_Unit');
    //Can_Unit_ID	Name	as ml.	
    const cols1: Array<Partial<Column>> = [
        { header: 'Can_Unit_ID', key: 'can_unit_id', width: 16 },
        { header: 'Name', key: 'name', width: 8 },
        { header: 'as ml.', key: 'as_ml', width: 8 },
    ];
    sheet.columns = cols1;

    sheet.getRow(1).values = {
        can_unit_id: 'Can_Unit_ID',
        name: 'Name',
        as_ml: 'as ml.'
    };

    for (let i = 0; i < canUnits.length; i++) {
        const item = canUnits[i];
        const r = {
            can_unit_id: item.id,
            name: item.name,
            as_ml: item.as_ml
        };
        sheet.getRow(i + 2).values = r;
    }

    return sheet;
}

async function buildSheet_4(workbook: Workbook, canUnits: CanUnit[], canSizes: CanSize[]) {
    const sheet = workbook.addWorksheet('Can_Size');
    //Can_Size_Id	Can_Unit_Id	Size	Display_Name	QRCode	
    const cols1: Array<Partial<Column>> = [
        { header: 'Can_Size_Id', key: 'can_size_id', width: 16 },
        { header: 'Can_Unit_Id', key: 'can_unit_id', width: 16 },
        { header: 'Size', key: 'size', width: 8 },
        { header: 'Display_Name', key: 'display_name', width: 16 },
        { header: 'QRCode', key: 'qrcode', width: 8 },
    ];
    sheet.columns = cols1;

    sheet.getRow(1).values = {
        can_size_id: 'Can_Size_Id',
        can_unit_id: 'Can_Unit_Id',
        size: 'Size',
        display_name: 'Display_Name',
        qrcode: 'QRCode'
    };

    for (let i = 0; i < canSizes.length; i++) {
        const item = canSizes[i];
        const r = {
            can_size_id: item.id,
            can_unit_id: item.can_unit_id,
            size: item.can_size,
            display_name: item.display_name,
            qrcode: null
        };
        sheet.getRow(i + 2).values = r;
    }

    return sheet;
}

async function buildSheet_5(workbook: Workbook, productCanSizes: ProductCanSize[], products: Product[], canSizes: CanSize[]) {
    const sheet = workbook.addWorksheet('Product_Can_Size');
    //Product	Can_Size_ID		
    const cols1: Array<Partial<Column>> = [
        { header: 'Product', key: 'product', width: 16 },
        { header: 'Can_Size_ID', key: 'can_size_id', width: 8 },
    ];
    sheet.columns = cols1;

    sheet.getRow(1).values = {
        product: 'Product',
        can_size_id: 'Can_Size_ID',
    };

    for (let i = 0; i < productCanSizes.length; i++) {
        const item = productCanSizes[i];
        const pd = products.find((value) => value.id == item.product_id);
        const r = {
            product: pd?.name,
            can_size_id: item.can_size_id,
        };
        sheet.getRow(i + 2).values = r;
    }

    return sheet;
}

async function buildSheet_6(workbook: Workbook, productBasePricings: ProductBasePricing[], dbConfig: DBConfig, products: Product[], productBases: ProductBase[], canSizes: CanSize[]) {
    const sheet = workbook.addWorksheet('Product_Base_Pricing');
    //Product	Base	Can_Size_ID	Price	Can_Name (For user, ignore for importing)	Base_Cansize_QRCode	MarkUp_Price01	MarkUp_Price02	MarkUp_Price03	Default_MarkUp_Price
    const cols1: Array<Partial<Column>> = [
        { header: 'Product', key: 'product', width: 16 },
        { header: 'Base', key: 'base', width: 16 },
        { header: 'Can_Size_ID', key: 'can_size_id', width: 8 },
        { header: 'Price', key: 'price', width: 16 },
        { header: 'Can_Name (For user, ignore for importing)', key: 'can_name', width: 32 },
        { header: 'Base_Cansize_QRCode', key: 'qrcode', width: 28 },
        { header: 'MarkUp_Price01', key: 'markup_price_01', width: 28 },
        { header: 'MarkUp_Price02', key: 'markup_price_02', width: 28 },
        { header: 'MarkUp_Price03', key: 'markup_price_03', width: 28 },
        { header: 'Default_MarkUp_Price', key: 'default_markup_price', width: 28 },
    ];
    sheet.columns = cols1;

    sheet.getRow(1).values = {
        product: 'Product',
        base: 'Base',
        can_size_id: 'Can_Size_ID',
        price: 'Price',
        can_name: 'Can_Name (For user, ignore for importing)',
        qrcode: 'Base_Cansize_QRCode',
        markup_price_01: 'MarkUp_Price01',
        markup_price_02: 'MarkUp_Price02',
        markup_price_03: 'MarkUp_Price03',
        default_markup_price: 'Default_MarkUp_Price'
    };

    for (let i = 0; i < productBasePricings.length; i++) {
        const item = productBasePricings[i];
        const pb = productBases.find((value) => value.id == item.product_base_id);
        const pd = products.find((value) => value.id == pb?.product_id);
        const r = {
            product: pd?.name,
            base: pb?.name,
            can_size_id: item.can_size_id,
            price: item.unit_price,
            can_name: null,
            qrcode: null,
            markup_price_01: item.mark_up_price_01,
            markup_price_02: item.mark_up_price_02,
            markup_price_03: item.mark_up_price_03,
            default_markup_price: item.default_mark_up_price
        };
        sheet.getRow(i + 2).values = r;
    }

    return sheet;
}

async function buildSheet_7(workbook: Workbook, generalPricings: GeneralPricing[], canSizes: CanSize[]) {
    const sheet = workbook.addWorksheet('General_Pricing');
    //Can_ID	Price	MarkUp_Price01	MarkUp_Price02	MarkUp_Price03	Default_MarkUp_Price	
    const cols1: Array<Partial<Column>> = [
        { header: 'Can_ID', key: 'can_id', width: 8 },
        { header: 'Price', key: 'price', width: 8 },
        { header: 'MarkUp_Price01', key: 'markup_price_01', width: 28 },
        { header: 'MarkUp_Price02', key: 'markup_price_02', width: 28 },
        { header: 'MarkUp_Price03', key: 'markup_price_03', width: 28 },
        { header: 'Default_MarkUp_Price', key: 'default_markup_price', width: 28 },
    ];
    sheet.columns = cols1;

    sheet.getRow(1).values = {
        can_id: 'Can_ID',
        price: 'Price',
        markup_price_01: 'MarkUp_Price01',
        markup_price_02: 'MarkUp_Price02',
        markup_price_03: 'MarkUp_Price03',
        default_markup_price: 'Default_MarkUp_Price'
    };

    for (let i = 0; i < generalPricings.length; i++) {
        const item = generalPricings[i];
        const r = {
            can_id: item.can_size_id,
            price: item.price,
            markup_price_01: item.mark_up_price_01,
            markup_price_02: item.mark_up_price_02,
            markup_price_03: item.mark_up_price_03,
            default_markup_price: item.default_mark_up_price
        };
        sheet.getRow(i + 2).values = r;
    }

    return sheet;
}

async function buildSheet_8(workbook: Workbook, dbVersion: DBVersion) {
    const sheet = workbook.addWorksheet('DB_Version');
    //DB_Version_Name	DB_Version		
    const cols1: Array<Partial<Column>> = [
        { header: 'DB_Version_Name', key: 'name', width: 28 },
        { header: 'DB_Version', key: 'version', width: 12 },
    ];
    sheet.columns = cols1;

    sheet.getRow(1).values = {
        name: 'DB_Version_Name',
        version: 'DB_Version',
    };

    sheet.getRow(2).values = {
        name: dbVersion.name,
        version: dbVersion.db_version,
    };

    return sheet;
}