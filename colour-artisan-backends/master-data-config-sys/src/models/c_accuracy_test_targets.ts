import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from "../../db/db";

export interface AccuracyTestTarget extends TableRecord{
    //Target ml.	
    //Repeat
    tinting_profile_id: any,
    target_ml: number,
    repeat: number
}

export class AccuracyTestTargetSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.AccuracyTestTarget);
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