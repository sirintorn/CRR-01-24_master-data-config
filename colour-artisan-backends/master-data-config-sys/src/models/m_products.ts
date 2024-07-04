import {TABLE_NAMES, TableRecord, TableRecordsSchema} from '../../db/db';

export interface Product extends TableRecord{
    db_version_id: any,
    product_group_id: any,
    name: string,
}

export class ProductsSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.Products);
    }

    getAll(): Promise<Product[]>{
        return super.getAll();
    }

    get(id: any): Promise<Product>{
        return super.get(id);
    }

    create(data: Product): Promise<any[]>{
        return super.create(data);
    }

    update(id: any, data: Product): Promise<any>{
        return super.update(id, data);
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }
}



