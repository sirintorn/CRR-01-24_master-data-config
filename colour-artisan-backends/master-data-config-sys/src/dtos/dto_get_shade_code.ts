import { CanSize } from "../models/m_can_sizes";
import { DBVersion } from "../models/m_db_versions";
import { ProductBase } from "../models/m_product_bases";
import { ProductGroup } from "../models/m_product_groups";
import { ProductShadeCode } from "../models/m_product_shade_codes";
import { Product } from "../models/m_products";
import { SubProduct } from "../models/m_sub_products";
import { DTO } from "./dto";

export class DtoGetShadeCode extends DTO {
    shadeCode!: string;
    shadeName!: string;

    red!: number;
    green!: number;
    blue!: number;

    remark!: string;
    createdAt!: Date;

    id!: string;
    
    dbVersionName!: string;
    productName!: string;
    productBaseName!: string;
    subProductName!: string;
    canSizeName!: string;
    productGroupName!: string;

    constructor(shade: ProductShadeCode, 
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
    }

    static parseFromArray(
        shades: ProductShadeCode[], 
        dbVersion: DBVersion, 
        groups: ProductGroup[], 
        products: Product[], 
        bases: ProductBase[], 
        subProducts: SubProduct[], 
        canSizes: CanSize[]
    ){
        let arr: DtoGetShadeCode[] = []
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

            const dto = new DtoGetShadeCode(
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
}