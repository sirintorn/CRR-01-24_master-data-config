import {TABLE_NAMES, TableRecord, TableRecordsSchema} from '../../db/db';

export interface CanSize extends TableRecord{
    db_version_id: any,
    can_unit_id: any,
    can_size: number,
    display_name: string,
}

export class CanSizesSchema extends TableRecordsSchema{

    constructor(){
        super(TABLE_NAMES.CanSizes);
    }

    getAll(): Promise<CanSize[]>{
        return super.getAll();
    }

    get(id: any): Promise<CanSize>{
        return super.get(id);
    }

    create(data: CanSize): Promise<any[]>{
        return super.create(data);
    }

    update(id: any, data: CanSize): Promise<any>{
        return super.update(id, data);
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }
}



