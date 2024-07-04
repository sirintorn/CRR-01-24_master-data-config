import { TABLE_NAMES, TableRecord, TableRecordsSchema } from "../../db/db";

export interface DBVersion extends TableRecord{
    company_id: any,
    name: string,
    db_version: string,
}

export class DBVersionsSchema extends TableRecordsSchema{

    constructor(){
        super(TABLE_NAMES.DBVersions);
    }

    getAll(): Promise<DBVersion[]>{
        return super.getAll();
    }

    get(id: any): Promise<DBVersion>{
        return super.get(id);
    }

    create(data: DBVersion): Promise<any[]>{
        return super.create(data);
    }

    update(id: any, data: DBVersion): Promise<any>{
        return super.update(id, data);
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }
}