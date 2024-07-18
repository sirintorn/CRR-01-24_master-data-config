import {TABLE_NAMES, TableRecord, TableRecordsSchema} from '../../db/db';

export interface GeneralPricing extends TableRecord{
    db_version_id: any,
    can_size_id: any,
    price: number,
    mark_up_price_01: number,
    mark_up_price_02: number,
    mark_up_price_03: number,
    default_mark_up_price: number,
}

export class GeneralPricingsSchema extends TableRecordsSchema{

    constructor(){
        super(TABLE_NAMES.GeneralPricings);
    }

    getAll(): Promise<GeneralPricing[]>{
        return super.getAll();
    }

    get(id: any): Promise<GeneralPricing>{
        return super.get(id);
    }

    create(data: GeneralPricing): Promise<any[]>{
        return super.create(data, true);
    }

    update(id: any, data: GeneralPricing): Promise<any>{
        return super.update(id, data);
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }
}



