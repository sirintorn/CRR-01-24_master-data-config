import { CanSize } from "../models/m_can_sizes";
import { DBVersion } from "../models/m_db_versions";
import { ProductBase } from "../models/m_product_bases";
import { ProductGroup } from "../models/m_product_groups";
import { ProductShadeCode } from "../models/m_product_shade_codes";
import { Product } from "../models/m_products";
import { SubProduct } from "../models/m_sub_products";
import { CustomProductShadeCode } from "../models/n_custom_product_shade_codes";
import { DTO } from "./dto";

export class DtoCustomShadeCode extends DTO {
    shadeCode!: string;
    shadeName!: string;

    red!: number;
    green!: number;
    blue!: number;

    remark!: string;
    createdAt!: any;

    id!: string;
    
    dbVersionName!: string;
    productName!: string;
    productBaseName!: string;
    subProductName!: string;
    canSizeName!: string;
    productGroupName!: string;

    customCanSizeMl?: number;

    machineId?: string;
    dbVersionId?: string;
    productId?: string;
    productBaseId?: string;
    subProductId?: string;
    canSizeId?: string;
    productGroupId?: string;

    constructor(shade: CustomProductShadeCode, 
        dbVersion?: DBVersion, 
        group?: ProductGroup, 
        product?: Product, 
        base?: ProductBase, 
        subProduct?: SubProduct, 
        canSize?: CanSize
    ){
        super();
        this.id = shade.id;
        this.shadeCode = shade.shade_code;
        this.shadeName = shade.shade_name;
        this.red = shade.red;
        this.green = shade.green;
        this.blue = shade.blue;
        this.remark = shade.remark;
        this.createdAt = new Date(shade.created_at);
        this.dbVersionName = dbVersion ? dbVersion.name : '';
        this.productName = product ? product.name : '';
        this.productBaseName = base ? base.name : '';
        this.subProductName = subProduct ? subProduct.name : '';
        this.canSizeName = canSize ? canSize.display_name : '';
        this.productGroupName = group ? group.name : '';
        
        this.machineId = shade.machine_id;
        this.dbVersionId = shade.db_version_id;
        this.productId = shade.product_id;
        this.productBaseId = shade.product_base_id;
        this.subProductId = shade.sub_product_id;
        this.canSizeId = shade.can_size_id;
        this.productGroupId = shade.product_group_id;
        this.customCanSizeMl = shade.custom_can_size_ml;
    }

    static parse(
        shade: CustomProductShadeCode, 
        dbVersion: DBVersion, 
        groups: ProductGroup[], 
        products: Product[], 
        bases: ProductBase[], 
        subProducts: SubProduct[], 
        canSizes: CanSize[]
    ){
        const pg = groups.find((value) => {
            if(value.id == shade.product_group_id) return value;
        });

        const p = products.find((value) => {
            if(value.id == shade.product_id) return value;
        });

        const pb = bases.find((value) => {
            if(value.id == shade.product_base_id) return value;
        });

        const sp = subProducts.find((value) => {
            if(value.id == shade.sub_product_id) return value;
        });
        
        const cs = canSizes.find((value) => {
            if(value.id == shade.can_size_id) return value;
        });

        const dto = new DtoCustomShadeCode(
            shade, 
            dbVersion, 
            pg, 
            p,
            pb,
            sp,
            cs
        );

        return dto;
    }

    static parseFromArray(
        shades: CustomProductShadeCode[], 
        dbVersion: DBVersion, 
        groups: ProductGroup[], 
        products: Product[], 
        bases: ProductBase[], 
        subProducts: SubProduct[], 
        canSizes: CanSize[]
    ){
        let arr: DtoCustomShadeCode[] = []
        for (let i = 0; i < shades.length; i++) {
            const item = shades[i];

            const pg = groups.find((value) => {
                if(value.id == item.product_group_id) return value;
            });

            const p = products.find((value) => {
                if(value.id == item.product_id) return value;
            });

            const pb = bases.find((value) => {
                if(value.id == item.product_base_id) return value;
            });

            const sp = subProducts.find((value) => {
                if(value.id == item.sub_product_id) return value;
            });
            
            const cs = canSizes.find((value) => {
                if(value.id == item.can_size_id) return value;
            });

            const dto = new DtoCustomShadeCode(
                item, 
                dbVersion, 
                pg, 
                p,
                pb,
                sp,
                cs
            );
            arr.push(dto);
        }
        return arr;
    }

    static reverseFromArray(
        shades: DtoCustomShadeCode[],
        machine_id: string
    ){
        let arr: CustomProductShadeCode[] = [];

        for (let i = 0; i < shades.length; i++) {
            const item = shades[i];
            const shade: CustomProductShadeCode = {
                machine_id: machine_id,
                db_version_id: item.dbVersionId,
                product_group_id: item.productGroupId,
                product_id: item.productId,
                shade_code: item.shadeCode,
                shade_name: item.shadeName,
                product_base_id: item.productBaseId,
                sub_product_id: item.subProductId,
                can_size_id: item.canSizeId,
                custom_can_size_ml: item.customCanSizeMl ?? 0,
                red: item.red,
                green: item.green,
                blue: item.blue,
                remark: item.remark
            };
            arr.push(shade);
        }

        return arr;
    }
}