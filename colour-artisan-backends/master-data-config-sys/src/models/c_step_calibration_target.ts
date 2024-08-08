import { TABLE_NAMES, TableRecord, TableRecordsSchema } from "../../db/db";

export interface StepCalibrationTarget extends TableRecord{
    //Target Step	
    //Target %Error	
    //Repeat
    target_step: number,
    target_err_rate: number,
    repeat: number
}

export class StepCalibrationTargetSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.StepCalibrationTarget);
    }
}