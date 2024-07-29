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
        return new Promise(async (resolve, reject) => {
            try {
                const table = DB<any>(this.tableName);
                const vals = await table.select('*').where('db_version_id', data.db_version_id).where('can_unit_id', data.can_unit_id).where('display_name', data.display_name).where('deleted_at', null);
                if(vals.length > 0){
                    reject({status: 409});
                }else{
                    const result = await super.create(data, true);  
                    resolve(result);  
                }
            } catch (error: any) {
                reject({status: 400, error: error});
            }
        });
    }

    update(id: any, data: CanSize): Promise<any>{
        return new Promise(async (resolve, reject) => {
            try {
                const table = DB<any>(this.tableName);
                const vals = await table.select('*').where('db_version_id', data.db_version_id).where('can_unit_id', data.can_unit_id).where('display_name', data.display_name).where('deleted_at', null);
                if(vals.length > 0){
                    reject({status: 409});
                }else{
                    const result = await super.update(id, data);  
                    resolve(result);  
                }
            } catch (error: any) {
                reject({status: 400});
            }
        });
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }

    deleteMultiple(ids: any[]): Promise<any> {
        return super.deleteMultiple(ids);
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



