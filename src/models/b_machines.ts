import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from "../../db/db";

export interface Machine extends TableRecord{
    company_id: any,
    machine_serial_no: string,
    bluetooth_mac_address: string,
    bluetooth_no: string,
    tinting_profile_id?: any,
    db_version_id?: any,
    visible?: boolean,
}

export class MachineSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.Machine);
    }

    getByCompany(company_id: any): Promise<Machine[]>{
        return new Promise((resolve, reject) => {
            const table = DB<Machine>(this.tableName);
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
}