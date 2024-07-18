import {TABLE_NAMES, TableRecord, TableRecordsSchema} from '../../db/db';

export interface ProductCanSize extends TableRecord{
    db_version_id: any,
    can_size_id: any,
    product_id: any,
    name: string,
}

export class ProductCanSizesSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.ProductCanSizes);
    }

    getAll(): Promise<ProductCanSize[]>{
        return super.getAll();
    }

    get(id: any): Promise<ProductCanSize>{
        return super.get(id);
    }

    create(data: ProductCanSize): Promise<any[]>{
        return super.create(data, true);
    }

    update(id: any, data: ProductCanSize): Promise<any>{
        return super.update(id, data);
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }
}



