import {TABLE_NAMES, TableRecord, TableRecordsSchema} from '../../db/db';

export interface SubProduct extends TableRecord{
    db_version_id: any,
    name: string,
}

export class SubProductsSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.SubProducts);
    }

    getAll(): Promise<SubProduct[]>{
        return super.getAll();
    }

    get(id: any): Promise<SubProduct>{
        return super.get(id);
    }

    create(data: SubProduct): Promise<any[]>{
        return super.create(data);
    }

    update(id: any, data: SubProduct): Promise<any>{
        return super.update(id, data);
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }
}



