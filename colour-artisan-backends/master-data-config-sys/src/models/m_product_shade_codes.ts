import {TABLE_NAMES, TableRecord, TableRecordsSchema} from '../../db/db';

export interface ProductShadeCode extends TableRecord{
    db_version_id: any,
    product_group_id: any,
    product_id: any,
    shade_code: string,
    shade_name: string,
    product_base_id: any,
    sub_product_id: any,
    can_size_id: any,
    red: number,
    green: number,
    blue: number,
    remark: string,
}

export class ProductShadeCodesSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.ProductShadeCodes);
    }

    getAll(): Promise<ProductShadeCode[]>{
        return super.getAll();
    }

    get(id: any): Promise<ProductShadeCode>{
        return super.get(id);
    }

    create(data: ProductShadeCode): Promise<any[]>{
        return super.create(data, true);
    }

    update(id: any, data: ProductShadeCode): Promise<any>{
        return super.update(id, data);
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }
}



