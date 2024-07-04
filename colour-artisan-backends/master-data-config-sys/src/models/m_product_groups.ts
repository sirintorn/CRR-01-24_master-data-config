import {TABLE_NAMES, TableRecord, TableRecordsSchema} from '../../db/db';

export interface ProductGroup extends TableRecord{
    db_version_id: any,
    name: string,
}

export class ProductGroupsSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.ProductGroups);
    }

    getAll(): Promise<ProductGroup[]>{
        return super.getAll();
    }

    get(id: any): Promise<ProductGroup>{
        return super.get(id);
    }

    create(data: ProductGroup): Promise<any[]>{
        return super.create(data);
    }

    update(id: any, data: ProductGroup): Promise<any>{
        return super.update(id, data);
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }
}



