import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from '../../db/db';

export interface CanUnit extends TableRecord {
    db_version_id: any,
    name: string,
    as_ml: number,
}

export class CanUnitsSchema extends TableRecordsSchema {

    constructor() {
        super(TABLE_NAMES.CanUnits);
    }

    getByDBVersion(db_version_id: any): Promise<CanUnit[]> {
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            //if the record was marked as deleted. it wont be quried.
            table.select('*').where('db_version_id', db_version_id).where('deleted_at', null).then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }

    getAll(): Promise<CanUnit[]> {
        return super.getAll();
    }

    get(id: any): Promise<CanUnit> {
        return super.get(id);
    }

    create(data: CanUnit): Promise<any[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const table = DB<any>(this.tableName);
                const vals = await table.select('*').where('db_version_id', data.db_version_id).where('name', data.name).where('deleted_at', null);
                if(vals.length > 0){
                    reject({status: 409});
                }else{
                    const result = await super.create(data, true);  
                    resolve(result);  
                }
            } catch (error) {
                throw error;
            }
        });
    }

    update(id: any, data: CanUnit): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const table = DB<any>(this.tableName);
                const vals = await table.select('*').where('db_version_id', data.db_version_id).where('name', data.name).where('deleted_at', null);
                if(vals.length > 0){
                    reject({status: 409});
                }else{
                    const result = await super.update(id, data);  
                    resolve(result);  
                }
            } catch (error) {
                throw error;
            }
        });
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }

    deleteMultiple(ids: any[]): Promise<any>{
        return super.deleteMultiple(ids);
    }
}



