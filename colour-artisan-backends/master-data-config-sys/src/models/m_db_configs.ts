import {TABLE_NAMES, TableRecord, TableRecordsSchema} from '../../db/db';

export interface DBConfig extends TableRecord{
    db_version_id: any,
    can_size_lookup_mode: any,
    can_size_lookup_key: any,
    discount: number,
    discount_visible: boolean,
    vat: number,
    vat_visible: boolean,
    total_price_rounding: number,
    total_price_visible: boolean,
    tinter_price_markup_price: number,
    tinter_price_markup_price_mode: any,
    tinter_price_visible: boolean,
    base_price_lookup_mode: any,
    base_price_markup_price: number,
    base_price_markup_price_mode: any,
    base_price_visible: boolean,
    display_unit: string,
    custom_ml_oz_unit: number,
}

export class DBConfigSchema extends TableRecordsSchema{

    constructor(){
        super(TABLE_NAMES.DBConfigs);
    }

    getAll(): Promise<DBConfig[]>{
        return super.getAll();
    }

    get(id: any): Promise<DBConfig>{
        return super.get(id);
    }

    create(data: DBConfig): Promise<any[]>{
        return super.create(data);
    }

    update(id: any, data: DBConfig): Promise<any>{
        return super.update(id, data);
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }
}



