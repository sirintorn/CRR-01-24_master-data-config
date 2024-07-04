import {TABLE_NAMES, TableRecord, TableRecordsSchema} from '../../db/db';

export interface CanUnit extends TableRecord{
    db_version_id: any,
    name: string,
    as_ml: number,
}

export class CanUnitsSchema extends TableRecordsSchema{

    constructor(){
        super(TABLE_NAMES.CanUnits);
    }

    getAll(): Promise<CanUnit[]>{
        return super.getAll();
    }

    get(id: any): Promise<CanUnit>{
        return super.get(id);
    }

    create(data: CanUnit): Promise<any[]>{
        return super.create(data);
    }

    update(id: any, data: CanUnit): Promise<any>{
        return super.update(id, data);
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }
}



