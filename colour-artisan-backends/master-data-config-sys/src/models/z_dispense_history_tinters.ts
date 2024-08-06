import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from "../../db/db";

export interface DispenseHistoryTinter extends TableRecord{
    company_id: any,
    machine_id: any,
    dispense_history_id: any,
    tinter_code: string,
    amount: number,
} 

export class DispenseHistoryTinterSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.DispenseHistoryTinters);
    }

    getByDispenseHistory(dispense_history_id: any): Promise<DispenseHistoryTinter[]>{
        return new Promise((resolve, reject) => {
            const table = DB<DispenseHistoryTinter>(this.tableName);
            table.select('*')
            .where('dispense_history_id', dispense_history_id)
            .where('deleted_at', null)
            .then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }
}