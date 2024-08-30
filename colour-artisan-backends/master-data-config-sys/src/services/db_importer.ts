import { Workbook } from "exceljs";
import { ProductTinter, ProductTintersSchema } from "../models/m_product_tinters";
import { ProductGroup, ProductGroupsSchema } from "../models/m_product_groups";
import { Product, ProductsSchema } from "../models/m_products";
import { ProductBase, ProductBasesSchema } from "../models/m_product_bases";
import { SubProduct, SubProductsSchema } from "../models/m_sub_products";
import { TinterPricing, TinterPricingsSchema } from "../models/m_tinter_pricings";
import { CanUnit, CanUnitsSchema } from "../models/m_can_units";
import { CanSize, CanSizesSchema } from "../models/m_can_sizes";
import { ProductCanSize, ProductCanSizesSchema } from "../models/m_product_can_sizes";
import { ProductBasePricing, ProductBasePricingsSchema } from "../models/m_product_base_pricings";
import { GeneralPricing, GeneralPricingsSchema } from "../models/m_general_pricings";
import { DBVersion } from "../models/m_db_versions";
import { ProductShadeCodesSchema } from "../models/m_product_shade_codes";

export class DBImporter {

    static async computeSheet_1(workbook: Workbook, db_version_id: any, canSizes: any[],
        tinterPricings: TinterPricing[],
        groupsSCH: ProductGroupsSchema,
        productsSCH: ProductsSchema,
        subProdSCH: SubProductsSchema,
        basesSCH: ProductBasesSchema,
        shadesSCH: ProductShadeCodesSchema,
        prodTinterSCH: ProductTintersSchema
    ) {
        try {
            const sheet = workbook.getWorksheet('Product');
            //Product_Group	Product	SHADE CODE	SHADE NAME	SubProduct	BASE	CANSIZE	AXX	B	C	D	E	F	I	KX	L	RH	T	V	RR	AN	Tinter15	Tinter16	Tinter17	Tinter18	Tinter19	Tinter20	Tinter21	Tinter22	Tinter23	Tinter24	Red	Green	Blue	Product_QRCode	Comment

            let shadeColNums: any[] = [];
            let tinterColNums: any[] = [];

            let shades: any[] = [];
            let productGroupMap: any = {};
            let productMap: any = {};
            let subProductMap: any = {};
            let productBaseMap: any = {};

            let product_groups: any[] = [];
            let products: any[] = [];
            let sub_products: any[] = [];
            let product_bases: any[] = [];


            sheet?.eachRow((row, rowNum) => {
                if (rowNum == 1) { //INITIALIZE WHAT COLUMNS SHOULD BE CONSIDERED ProductTinters
                    row.eachCell((cell, colNum) => {
                        const col = cell.value ? cell.value.toString() : '';
                        const colR = cell.result ? cell.result.toString() : '';
                        const col_l = col.toLowerCase();
                        if (col) {
                            if (colNum > 7) { //start from cell(8) is the tinters
                                //except cols that are "Red", "Green", "Blue", "Product_QRCode", "Comment"
                                let stopper = false;
                                switch (col_l) {
                                    case 'red':
                                    case 'green':
                                    case 'blue':
                                    case 'product_qrcode':
                                    case 'comment':
                                        shadeColNums.push({
                                            label: col_l,
                                            num: colNum
                                        });
                                        stopper = true;
                                        break;
                                    default:
                                        if (!stopper) tinterColNums.push({
                                            label: colR,
                                            num: colNum
                                        });
                                        break;
                                }
                            } else {
                                shadeColNums.push({
                                    label: col_l,
                                    num: colNum
                                });
                            }
                        }
                    });
                } else {
                    let shade: any = {
                        id: null,
                        db_version_id: db_version_id,
                        product_group_id: null,
                        product_id: null,
                        shade_code: '',
                        shade_name: '',
                        product_base_id: null,
                        sub_product_id: null,
                        can_size_id: null,
                        red: 0,
                        green: 0,
                        blue: 0,
                        remark: '',
                    };
                    let tinters: any[] = [];

                    shadeColNums.forEach((val, i) => {
                        const label = val.label;
                        const num = val.num;

                        const x = row.getCell(num).value ? row.getCell(num).value?.toString()! : null;
                        //const cellGroup = row.getCell(1).value ? row.getCell(1).value?.toString()! : null;
                        //const cellProduct = row.getCell(2).value ? row.getCell(2).value?.toString()! : null;
                        //const cellSubProduct = row.getCell(5).value ? row.getCell(5).value?.toString()! : null;

                        switch (label) {
                            case 'shade code':
                                if (x) {
                                    shade.shade_code = x;
                                }
                                break;
                            case 'shade name':
                                if (x) {
                                    shade.shade_name = x;
                                }
                                break;
                            case 'product_group':
                                if (x) {
                                    shade.product_group_id = x;
                                    productGroupMap[x] = {
                                        label: x
                                    };
                                }
                                break;
                            case 'product':
                                if (x) {
                                    const y = row.getCell(1).value ? row.getCell(1).value?.toString()! : null;
                                    shade.product_id = x;
                                    productMap[x] = {
                                        label: x,
                                        product_group: y
                                    };
                                }
                                break;
                            case 'subproduct':
                                if (x) {
                                    const y1 = row.getCell(1).value ? row.getCell(1).value?.toString()! : null;
                                    const y2 = row.getCell(2).value ? row.getCell(2).value?.toString()! : null;
                                    shade.sub_product_id = x;
                                    if(!subProductMap[y2!]){
                                        subProductMap[y2!] = {};
                                    }

                                    subProductMap[y2!][x] = {
                                        label: x,
                                        product_group: y1,
                                        product: y2
                                    };
                                }
                                break;
                            case 'base':
                                if (x) {
                                    const y1 = row.getCell(1).value ? row.getCell(1).value?.toString()! : null;
                                    const y2 = row.getCell(2).value ? row.getCell(2).value?.toString()! : null;
                                    const y5 = row.getCell(5).value ? row.getCell(5).value?.toString()! : null;
                                    shade.product_base_id = x;
                                    if(!productBaseMap[y5!]){
                                        productBaseMap[y5!] = {}
                                    }
                                    productBaseMap[y5!][x] = {
                                        label: x,
                                        product_group: y1,
                                        product: y2,
                                        sub_product: y5
                                    };
                                }
                                break;
                            case 'cansize':
                                if (x) {
                                    const c = canSizes.find((value) => value.can_size.toString() == x);
                                    shade.can_size_id = c ? c.id : '';
                                }
                                break;
                            case 'red':
                                if (x) {
                                    shade.red = Number(x);
                                }
                                break;
                            case 'green':
                                if (x) {
                                    shade.green = Number(x);
                                }
                                break;
                            case 'blue':
                                if (x) {
                                    shade.blue = Number(x);
                                }
                                break;
                            case 'product_qrcode':
                                break;
                            case 'comment':
                                if (x) {
                                    shade.remark = x;
                                }
                                break;
                            default:
                        }
                    });

                    tinterColNums.forEach((val, i) => {
                        const label = val.label;
                        const num = val.num;
                        let t: ProductTinter = {
                            id: null,
                            db_version_id: db_version_id,
                            product_shade_code_id: '',
                            tinter_code: '',
                            amount: 0,
                            sg: 0,
                            red: 0,
                            green: 0,
                            blue: 0,
                        };
                        let amount: number = row.getCell(num).value ? Number(row.getCell(num).value?.toString()) : 0;
                        if (amount > 0) {
                            t.tinter_code = label;
                            t.amount = amount;
                            let tp: TinterPricing = tinterPricings.find((value) => value.tinter_code == t.tinter_code)!;
                            t.red = tp ? tp.red : 0;
                            t.green = tp ? tp.green : 0;
                            t.blue = tp ? tp.blue : 0;
                            tinters.push(t);
                        }
                    });

                    shade.tinters = tinters;
                    shades.push(shade);
                }
            });

            for (var key in productGroupMap) {
                const item = productGroupMap[key];
                let data: ProductGroup = {
                    id: null,
                    db_version_id: db_version_id,
                    name: item.label
                };
                product_groups.push(data);
            }

            const pg_ids = await groupsSCH.createMultiple(product_groups, true);
            for (let i = 0; i < pg_ids.length; i++) {
                const item = pg_ids[i];
                product_groups[i].id = item.id;
            }

            for (var key in productMap) {
                const item = productMap[key];
                const pg = product_groups.find((value) => value.name == item.product_group);
                let data: Product = {
                    id: null,
                    db_version_id: db_version_id,
                    name: item.label,
                    product_group_id: pg ? pg.id : '',
                };
                products.push(data);
            }

            const p_ids = await productsSCH.createMultiple(products, true);
            for (let i = 0; i < p_ids.length; i++) {
                const item = p_ids[i];
                products[i].id = item.id;
            }

            for (var key in subProductMap) {
                const prod = subProductMap[key];
                for (var kx in prod) {
                    const item = prod[kx];
                    const pg = product_groups.find((value) => value.name == item.product_group);
                    const p = products.find((value) => (value.name == item.product) && (value.product_group_id == pg!.id));
                    let data: SubProduct = {
                        id: null,
                        db_version_id: db_version_id,
                        name: item.label ? item.label : '',
                        product_group_id: pg ? pg.id : '',
                        product_id: p ? p.id : ''
                    };
                    sub_products.push(data);   
                }
            }

            const sp_ids = await subProdSCH.createMultiple(sub_products, true);
            for (let i = 0; i < sp_ids.length; i++) {
                const item = sp_ids[i];
                sub_products[i].id = item.id;
            }


            for (var key in productBaseMap) {
                const subProd = productBaseMap[key];
                for(var kx in subProd){
                    const item  = subProd[kx];
                    const pg = product_groups.find((value) => value.name == item.product_group);
                    const p = products.find((value) => (value.name == item.product) && (value.product_group_id == pg!.id));
                    const sp = sub_products.find((value) => (value.name == item.sub_product) && (value.product_id == p!.id) && (value.product_group_id == pg!.id));
    
                    let data: ProductBase = {
                        id: null,
                        db_version_id: db_version_id,
                        product_id: p ? p.id : '',
                        name: item.label,
                        product_group_id: pg ? pg.id : '',
                        sub_product_id: sp ? sp.id : ''
                    };
                    product_bases.push(data);
                }
            }

            const pb_ids = await basesSCH.createMultiple(product_bases, true);
            for (let i = 0; i < pb_ids.length; i++) {
                const item = pb_ids[i];
                product_bases[i].id = item.id;
            }

            //PREPARE TO UPLOAD PRODUCT SHADES
            let tinters = [];
            for (let i = 0; i < shades.length; i++) {
                let item = shades[i];
                const pgid = item.product_group_id;
                const pg = product_groups.find((value) => value.name == pgid);

                const pid = item.product_id;
                const p = products.find((value) => (value.name == pid) && (value.product_group_id == pg!.id));

                const spid = item.sub_product_id;
                const sp = sub_products.find((value) => (value.name == spid) && (value.product_id == p!.id) && (value.product_group_id == pg!.id));

                const pbid = item.product_base_id;
                const pb = product_bases.find((value) => (value.name == pbid) && (value.product_id == p!.id) && (value.product_group_id == pg!.id));

                if(!pb){
                    console.log('WOT!?', product_bases.find((value) => (value.name == pbid)), sp, p, pg, item);
                }

                item.product_group_id = pg ? pg.id : '';
                item.product_id = p ? p.id : '';
                item.sub_product_id = sp ? sp.id : '';
                item.product_base_id = pb ? pb.id : '';
            }

            let data = {
                product_groups: product_groups,
                products: products,
                product_bases: product_bases,
                sub_products: sub_products,
                shades: shades,
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    static async batchUpFromShades(shadesSCH: ProductShadeCodesSchema, tintersSCH: ProductTintersSchema, shades: any[]) {
        let tints = [];
        for (let i = 0; i < shades.length; i++) {
            const sh = shades[i];
            tints.push(sh.tinters);
            delete sh.tinters;
        }
        let ids = await shadesSCH.batchInsert(shades, true);
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i].id;
            const ts = tints[i];
            if (ts) {
                for (let k = 0; k < ts.length; k++) {
                    let t = ts[k];
                    t.product_shade_code_id = id;
                }
                await tintersSCH.batchInsert(ts, true);
            }
        }
        return;
    }


    static async computeSheet_2(workbook: Workbook, db_version_id: any, tinterPSCH: TinterPricingsSchema) {
        const sheet = workbook.getWorksheet('Tinter');
        //Tinter Code	Tinter Name	SG	R	G	B	Price	Tinter_QRCode (Represent Tinter Code)	Tinter_MarkUp_Price (%)	Tinter_MarkUp_Price02 (%)	Tinter_MarkUp_Price03 (%)	Default_Tinter_MarkUp_Price (%)			

        let rows: TinterPricing[] = [];
        sheet?.eachRow((row, rowNum) => {
            if (rowNum !== 1) {
                const data: TinterPricing = {
                    id: null,
                    db_version_id: db_version_id,
                    tinter_code: row.getCell(1).value ? row.getCell(1).value?.toString()! : '',
                    tinter_name: row.getCell(2).value ? row.getCell(2).value?.toString()! : '',
                    sg: row.getCell(3).value ? Number(row.getCell(3).value?.toString()) : 0,
                    red: row.getCell(4).value ? Number(row.getCell(4).value?.toString()) : 0,
                    green: row.getCell(5).value ? Number(row.getCell(5).value?.toString()) : 0,
                    blue: row.getCell(6).value ? Number(row.getCell(6).value?.toString()) : 0,
                    price: row.getCell(7).value ? Number(row.getCell(7).value?.toString()) : 0,
                    mark_up_price_01: row.getCell(9).value ? Number(row.getCell(9).value?.toString()) : 0,
                    mark_up_price_02: row.getCell(10).value ? Number(row.getCell(10).value?.toString()) : 0,
                    mark_up_price_03: row.getCell(11).value ? Number(row.getCell(11).value?.toString()) : 0,
                    default_mark_up_price: row.getCell(12).value ? Number(row.getCell(12).value?.toString()) : 0
                };
                rows.push(data);
            }
        });

        const ids = await tinterPSCH.batchInsert(rows, true);

        for (let i = 0; i < ids.length; i++) {
            const item = ids[i];
            rows[i].id = item.id;
        }

        return rows;
    }

    static async computeSheet_3(workbook: Workbook, db_version_id: any, canUnitsSCH: CanUnitsSchema) {
        let sheet = workbook.getWorksheet('Can_Unit');
        //Can_Unit_ID	Name	as ml.	

        let rows: any[] = [];
        let old_ids: string[] = [];
        sheet?.eachRow((row, rowNum) => {
            if (rowNum !== 1) {
                const id = row.getCell(1).value ? row.getCell(1).value?.toString()! : '';
                old_ids.push(id);
                const data: CanUnit = {
                    db_version_id: db_version_id,
                    id: id,
                    name: row.getCell(2).value ? row.getCell(2).value?.toString()! : '',
                    as_ml: row.getCell(3).value ? Number(row.getCell(3).value?.toString()) : 0
                };
                rows.push(data);
            }
        });

        const ids = await canUnitsSCH.batchInsert(rows, true);
        for (let i = 0; i < ids.length; i++) {
            const item = ids[i];
            rows[i]._id = old_ids[i];
            rows[i].id = item.id;
        }

        return rows;
    }

    static async computeSheet_4(workbook: Workbook, db_version_id: any, canSizesSCH: CanSizesSchema, can_units: any[]) {
        const sheet = workbook.getWorksheet('Can_Size');
        //Can_Size_Id	Can_Unit_Id	Size	Display_Name	QRCode	
        let rows: any[] = [];
        let old_ids: string[] = [];
        sheet?.eachRow((row, rowNum) => {
            if (rowNum !== 1) {
                const id = row.getCell(1).value ? row.getCell(1).value?.toString()! : '';
                old_ids.push(id);

                const cuid = row.getCell(2).value ? row.getCell(2).value?.toString() : null;
                const cu = can_units.find((value) => value._id == cuid);

                const data: CanSize = {
                    db_version_id: db_version_id,
                    id: row.getCell(1).value ? row.getCell(1).value?.toString() : null,
                    can_unit_id: cu ? cu.id : '',
                    can_size: row.getCell(3).value ? Number(row.getCell(3).value?.toString()) : 0,
                    display_name: row.getCell(4).value ? row.getCell(4).value?.toString()! : "",
                };
                rows.push(data);
            }
        });

        const ids = await canSizesSCH.batchInsert(rows, true);

        for (let i = 0; i < ids.length; i++) {
            const item = ids[i];
            rows[i]._id = old_ids[i];
            rows[i].id = item.id;
        }

        return rows;
    }

    static async computeSheet_5(workbook: Workbook,
        db_version_id: any,
        products: Product[],
        canSizes: any[],
        prodCanSizesSCH: ProductCanSizesSchema,
        productsSCH: ProductsSchema,
        groups: ProductGroup[]
    ) {
        const sheet = workbook.getWorksheet('Product_Can_Size');
        //Product	Can_Size_ID		
        let rows: ProductCanSize[] = [];
        sheet?.eachRow(async (row, rowNum) => {
            if (rowNum !== 1) {
                const pid = row.getCell(1).value ? row.getCell(1).value?.toString()! : '';
                let p = products.find((value) => value.name == pid);
                if (!p) {
                    let newp: Product = {
                        id: null,
                        db_version_id: db_version_id,
                        product_group_id: groups[0].id,
                        name: pid
                    };
                    const id = await productsSCH.create(newp);
                    newp.id = id[0].id;
                    p = newp;
                }
                const csid = row.getCell(2).value ? row.getCell(2).value?.toString() : null;
                const cs = canSizes.find((value) => value._id == csid);

                const data: ProductCanSize = {
                    id: null,
                    db_version_id: db_version_id,
                    product_id: p ? p.id : '',
                    can_size_id: cs ? cs.id : '',
                };
                rows.push(data);
            }
        });

        const ids = await prodCanSizesSCH.batchInsert(rows, true);
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i].id;
            rows[i].id = id;
        }

        return rows;
    }

    static async computeSheet_6(
        workbook: Workbook,
        db_version_id: any,
        bases: ProductBase[],
        canSizes: any[],
        productBasePSCH: ProductBasePricingsSchema,
        productsSCH: ProductsSchema,
        basesSCH: ProductBasesSchema,
        products: Product[],
        groups: ProductGroup[]
    ) {
        const sheet = workbook.getWorksheet('Product_Base_Pricing');
        //Product	Base	Can_Size_ID	Price	Can_Name (For user, ignore for importing)	Base_Cansize_QRCode	MarkUp_Price01	MarkUp_Price02	MarkUp_Price03	Default_MarkUp_Price
        let rows: any[] = [];
        let newbases: any[] = [];
        sheet?.eachRow(async (row, rowNum) => {
            if (rowNum !== 1) {
                const pbid = row.getCell(2).value ? row.getCell(2).value?.toString()! : '';
                let pb = bases.find((value) => value.name == pbid);

                if (!pb) {
                    const pid = row.getCell(1).value ? row.getCell(1).value?.toString()! : '';
                    const ps = products.find((value) => value.name == pid);
                    let p = null;
                    if (ps) {
                        //get existing product
                        p = ps;
                    } else {
                        //create new product
                        p = {
                            id: null,
                            db_version_id: db_version_id,
                            product_group_id: groups[0].id,
                            name: pid
                        } as Product;
                        const id = await productsSCH.create(p);
                        p.id = id[0].id;
                    }

                    const newpb = newbases.find((value) => value.name == pbid);
                    if(newpb){
                        pb = newpb;
                    }else{
                        pb = {
                            id: null,
                            db_version_id: db_version_id,
                            product_id: p.id,
                            name: pbid,
                            sub_product_id: '',
                            product_group_id: groups[0].id,
                        };
                        const id = await basesSCH.create(pb);
                        pb.id = id[0].id;
                        newbases.push(pb);
                    }
                }

                const csid = row.getCell(3).value ? row.getCell(3).value?.toString() : null;
                const cs = canSizes.find((value) => value._id == csid);

                const data: ProductBasePricing = {
                    id: null,
                    db_version_id: db_version_id,
                    product_base_id: pb ? pb.id : '',
                    can_size_id: cs ? cs.id : '',
                    unit_price: row.getCell(4).value ? Number(row.getCell(4).value?.toString()) : 0,
                    mark_up_price_01: row.getCell(7).value ? Number(row.getCell(7).value?.toString()) : 0,
                    mark_up_price_02: row.getCell(8).value ? Number(row.getCell(8).value?.toString()) : 0,
                    mark_up_price_03: row.getCell(9).value ? Number(row.getCell(9).value?.toString()) : 0,
                    default_mark_up_price: row.getCell(10).value ? Number(row.getCell(10).value?.toString()) : 0,
                };
                rows.push(data);
            }
        });

        const ids = await productBasePSCH.batchInsert(rows, true);
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i].id;
            rows[i].id = id;
        }

        return rows;
    }

    static async computeSheet_7(workbook: Workbook, db_version_id: any, canSizes: any[], generalPSCH: GeneralPricingsSchema) {
        const sheet = workbook.getWorksheet('General_Pricing');
        //Can_ID	Price	MarkUp_Price01	MarkUp_Price02	MarkUp_Price03	Default_MarkUp_Price	
        let rows: any[] = [];
        sheet?.eachRow((row, rowNum) => {
            if (rowNum !== 1) {
                const csid = row.getCell(1).value ? row.getCell(1).value?.toString() : null;
                const cs = canSizes.find((value) => value._id == csid);
                const data: GeneralPricing = {
                    id: null,
                    db_version_id: db_version_id,
                    can_size_id: cs ? cs.id : '',
                    price: row.getCell(2).value ? Number(row.getCell(2).value?.toString()) : 0,
                    mark_up_price_01: row.getCell(3).value ? Number(row.getCell(3).value?.toString()) : 0,
                    mark_up_price_02: row.getCell(4).value ? Number(row.getCell(4).value?.toString()) : 0,
                    mark_up_price_03: row.getCell(5).value ? Number(row.getCell(5).value?.toString()) : 0,
                    default_mark_up_price: row.getCell(6).value ? Number(row.getCell(6).value?.toString()) : 0,
                };
                rows.push(data);
            }
        });

        const ids = await generalPSCH.batchInsert(rows, true);
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i].id;
            rows[i].id = id;
        }

        return rows;
    }

    static async computeSheet_8(workbook: Workbook) {
        const sheet = workbook.getWorksheet('DB_Version');
        //DB_Version_Name	DB_Version		
        let rows: any[] = [];
        sheet?.eachRow((row, rowNum) => {
            if (rowNum !== 1) {
                const data: DBVersion = {
                    id: null,
                    company_id: null,
                    name: row.getCell(1).value ? row.getCell(1).value?.toString()! : '',
                    db_version: row.getCell(2).value ? row.getCell(2).value?.toString()! : ''
                };
                rows.push(data);
            }
        });

        return rows;
    }

}