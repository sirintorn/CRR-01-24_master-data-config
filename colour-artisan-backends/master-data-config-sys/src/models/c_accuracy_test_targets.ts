import { TABLE_NAMES, TableRecordsSchema } from "../../db/db";

export interface AccuracyTestTarget{
    //Target ml.	
    //Repeat
    target_ml: number,
    repeat: number
}

export class AccuracyTestTargetSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.AccuracyTestTarget);
    }
}