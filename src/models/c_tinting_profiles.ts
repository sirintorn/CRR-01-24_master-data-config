import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from "../../db/db";

export interface TintingProfile extends TableRecord{
    machine_id: any,
}

export class TintingProfileSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.TintingProfile);
    }
}