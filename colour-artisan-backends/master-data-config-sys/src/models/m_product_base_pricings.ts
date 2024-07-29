import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from '../../db/db';

export interface ProductBasePricing extends TableRecord {
    db_version_id: any,
    product_base_id: any,
    can_size_id: any,
    unit_price: number,
    mark_up_price_01: number,
    mark_up_price_02: number,
    mark_up_price_03: number,
    default_mark_up_price: number,
}

export class ProductBasePricingsSchema extends TableRecordsSchema {

    constructor() {
        super(TABLE_NAMES.ProductBasePricings);
    }

    getAll(): Promise<ProductBasePricing[]> {
        return super.getAll();
    }

    get(id: any): Promise<ProductBasePricing> {
        return super.get(id);
    }

    create(data: ProductBasePricing): Promise<any[]> {
        return super.create(data, true);
    }

    update(id: any, data: ProductBasePricing): Promise<any> {
        return super.update(id, data);
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }

    ////BUSINESS LOGICS
    getByDBVersion(db_version_id: any): Promise<ProductBasePricing[]> {
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



