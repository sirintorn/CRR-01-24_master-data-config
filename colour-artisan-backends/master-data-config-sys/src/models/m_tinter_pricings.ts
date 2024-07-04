import {TABLE_NAMES, TableRecord, TableRecordsSchema} from '../../db/db';

export interface TinterPricing extends TableRecord{
    db_version_id: any,
    tinter_code: string,
    tinter_name: string,
    sg: number,
    red: number,
    green: number,
    blue: number,
    price: number,
    mark_up_price_01: number,
    mark_up_price_02: number,
    mark_up_price_03: number,
    default_mark_up_price: number,
}

export class TinterPricingsSchema extends TableRecordsSchema{

    constructor(){
        super(TABLE_NAMES.TinterPricings);
    }

    getAll(): Promise<TinterPricing[]>{
        return super.getAll();
    }

    get(id: any): Promise<TinterPricing>{
        return super.get(id);
    }

    create(data: TinterPricing): Promise<any[]>{
        return super.create(data);
    }

    update(id: any, data: TinterPricing): Promise<any>{
        return super.update(id, data);
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }
}



