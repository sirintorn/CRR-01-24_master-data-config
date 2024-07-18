import knex from "knex";
import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from "../../db/db";
import { DBConfigsSchema } from "./m_db_configs";

export interface DBVersion extends TableRecord{
    company_id: any,
    name: string,
    db_version: string,
}

export class DBVersionsSchema extends TableRecordsSchema{

    constructor(){
        super(TABLE_NAMES.DBVersions);
    }

    getByCompanyId(id: string): DBVersion[] | PromiseLike<DBVersion[]> {
        return new Promise((resolve, reject) => {
            DB.raw(`select a.*, (select COUNT(k.*) 
                from "${TABLE_NAMES.ProductShadeCodes}" as k where a.id = k.db_version_id) AS shades 
                from "${this.tableName}" as a where deleted_at is NULL and company_id = '${id}'
                order by a.updated_at DESC;`)
                .then(val => {
                    resolve(val["rows"]);
                }).catch(error => {
                    reject(error);
                });
            /*const table = DB<any>(this.tableName);
            table.select('*').where('deleted_at', null).where('company_id', id).then((val) => {

                resolve(val);
            }).catch(error => {
                reject(error);
            });*/
        });
    }

    getAll(): Promise<DBVersion[]>{
        return super.getAll();
    }

    get(id: any): Promise<DBVersion>{
        return super.get(id);
    }

    async create(data: DBVersion): Promise<any[]>{
        return super.create(data, true);
    }

    update(id: any, data: DBVersion): Promise<any>{
        return super.update(id, data);
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }
}