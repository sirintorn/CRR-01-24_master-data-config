import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from "../../db/db";

export interface StepCalibrationTarget extends TableRecord{
    //Target Step	
    //Target %Error	
    //Repeat
    tinting_profile_id: any,
    target_step: number,
    target_err_rate: number,
    repeat: number
}

export class StepCalibrationTargetSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.StepCalibrationTarget);
    }

    getByTintingProfile(tinting_profile_id: any): Promise<any[]>{
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.select('*')
            .where('tinting_profile_id', tinting_profile_id)
            .where('deleted_at', null)
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