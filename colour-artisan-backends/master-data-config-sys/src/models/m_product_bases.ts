import {TABLE_NAMES, TableRecord, TableRecordsSchema} from '../../db/db';

export interface ProductBase extends TableRecord{
    db_version_id: any,
    product_id: any,
    name: string,
}

export class ProductBasesSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.ProductBases);
    }

    getAll(): Promise<ProductBase[]>{
        return super.getAll();
    }

    get(id: any): Promise<ProductBase>{
        return super.get(id);
    }

    create(data: ProductBase): Promise<any[]>{
        return super.create(data);
    }

    update(id: any, data: ProductBase): Promise<any>{
        return super.update(id, data);
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }
}



