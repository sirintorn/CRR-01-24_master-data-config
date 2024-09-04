import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from "../../db/db";

export interface CalibrationInfo extends TableRecord{
    //Index	
    //Tinter Code	
    //Tinter Name	
    //Target ml.	
    //Target %Error	
    //Repeat	
    //Result 
    //Step	
    //Result ml.	
    //Result g.	
    //Result %Error	
    //Status	
    //Created	
    //Modified
    tinting_profile_id: any,
    index: number,
    tinter_code: string,
    tinter_name: string,
    target_ml: number,
    target_err_rate: number,
    repeat: number,
    result_step: number,
    result_ml: number,
    result_g: number,
    result_err_rate: number,
    status: string,
    created: any,
    modified: any
}

export class CalibrationInfoSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.CalibrationInfo);
    }

    getByTintingProfile(tinting_profile_id: any): Promise<any[]>{
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.select('*')
            .where('tinting_profile_id', tinting_profile_id)
            .where('deleted_at', null)
            .orderBy('index', 'asc')
            .then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }

    forceDeleteByTintingProfile(tinting_profile_id: any): Promise<any>{
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.delete()
            .where('tinting_profile_id', tinting_profile_id)
            .then(val => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }
}