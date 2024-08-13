import { TABLE_NAMES, TableRecord, TableRecordsSchema } from "../../db/db";

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
}