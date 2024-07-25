import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from '../../db/db';

export interface TinterPricing extends TableRecord {
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

export class TinterPricingsSchema extends TableRecordsSchema {

    constructor() {
        super(TABLE_NAMES.TinterPricings);
    }

    getAll(): Promise<TinterPricing[]> {
        return super.getAll();
    }

    get(id: any): Promise<TinterPricing> {
        return super.get(id);
    }

    create(data: TinterPricing): Promise<any[]> {
        return super.create(data, true);
    }

    update(id: any, data: TinterPricing): Promise<any> {
        return super.update(id, data);
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }


    ///BUSINESS LOGICS
    getByDBVersion(db_version_id: any): Promise<TinterPricing[]> {
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.select('*').where('db_version_id', db_version_id).where('deleted_at', null).then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }
}



