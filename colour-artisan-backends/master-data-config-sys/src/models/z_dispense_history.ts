import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from "../../db/db"

export interface DispenseHistory extends TableRecord{
    company_id: any,
    machine_id: any,
    source: string,
    status: string,
    db_version: string,
    shade_code: string
}

export class DispenseHistorySchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.DispenseHistory);
    }

    getByCompany(company_id: any): Promise<DispenseHistory[]>{
        return new Promise((resolve, reject) => {
            const table = DB<DispenseHistory>(this.tableName);
            table.select('*')
            .where('company_id', company_id)
            .where('deleted_at', null)
            .then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }

    getByMachine(machine_id: any): Promise<DispenseHistory[]>{
        return new Promise((resolve, reject) => {
            const table = DB<DispenseHistory>(this.tableName);
            table.select('*')
            .where('machine_id', machine_id)
            .where('deleted_at', null)
            .then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }
}