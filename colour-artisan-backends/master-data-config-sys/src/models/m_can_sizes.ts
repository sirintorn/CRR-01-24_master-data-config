import {DB, TABLE_NAMES, TableRecord, TableRecordsSchema} from '../../db/db';

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
        return super.create(data, true);
    }

    update(id: any, data: CanSize): Promise<any>{
        return super.update(id, data);
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }

    //BUSINESS LOGICS
    getByDBVersion(db_version_id: any): Promise<CanSize[]> {
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.select('*').where('db_version_id', db_version_id).where('deleted_at', null).then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }

}



