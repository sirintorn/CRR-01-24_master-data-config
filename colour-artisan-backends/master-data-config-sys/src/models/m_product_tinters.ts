import {TABLE_NAMES, TableRecord, TableRecordsSchema} from '../../db/db';

export interface ProductTinter extends TableRecord{
    db_version_id: any,
    product_shade_code_id: any,
    tinter_code: string,
    amount: number,
    sg: number,
    red: number,
    green: number,
    blue: number,
}

export class ProductTintersSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.ProductTinters);
    }

    getAll(): Promise<ProductTinter[]>{
        return super.getAll();
    }

    get(id: any): Promise<ProductTinter>{
        return super.get(id);
    }

    create(data: ProductTinter): Promise<any[]>{
        return super.create(data);
    }

    update(id: any, data: ProductTinter): Promise<any>{
        return super.update(id, data);
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }
}



