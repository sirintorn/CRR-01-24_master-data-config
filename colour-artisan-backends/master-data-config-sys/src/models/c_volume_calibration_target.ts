import { TABLE_NAMES, TableRecord, TableRecordsSchema } from "../../db/db";

export interface VolumeCalibrationTarget extends TableRecord{
    //Target ml.	
    //Target %Error	
    //Repeat
    target_ml: number,
    target_err_rate: number,
    repeat: number
}

export class VolumeCalibrationTargetSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.VolumeCalibrationTarget);
    }
}