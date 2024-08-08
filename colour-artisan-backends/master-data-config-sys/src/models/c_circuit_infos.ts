import { TABLE_NAMES, TableRecord, TableRecordsSchema } from "../../db/db";

export interface CircuitInfo extends TableRecord{
    //Enabled	
    //Index	
    //Tinter Code	
    //Tinter Name	
    //RGB	
    //SG	
    //Max Level	
    //Refill Level	
    //Cutoff Level	
    //Current Level
    enabled: boolean,
    index: number,
    tinter_code: string,
    tinter_name: string,
    rgb: string,
    sg: number,
    max_level: number,
    refill_level: number,
    cutoff_level: number,
    current_level: number
}

export class CircuitInfoSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.CircuitInfo);
    }
}