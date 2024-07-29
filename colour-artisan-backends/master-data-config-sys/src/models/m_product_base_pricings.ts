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

    createMultiple(datas: any[], isNewId?: boolean): Promise<any> {
        return super.create(datas, true);
    }

    update(id: any, data: ProductBasePricing): Promise<any> {
        return super.update(id, data);
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }

    generateRecord(db_version_id: any, product_base_id: any, can_size_id: any): ProductBasePricing{
        return {
            db_version_id: db_version_id,
            product_base_id: product_base_id,
            can_size_id: can_size_id,
            unit_price: 0,
            mark_up_price_01: 0,
            mark_up_price_02: 0,
            mark_up_price_03: 0,
            default_mark_up_price: 0,
        } as ProductBasePricing;
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

    deleteByCanSize(can_size_id: any){
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.where('can_size_id', can_size_id).update({'deleted_at': DB.fn.now()}).then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }

    deleteByCanSizesMultiple(can_size_ids: any[]){
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.whereIn('can_size_id', can_size_ids).update({'deleted_at': DB.fn.now()}).then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }

    deleteByProductBase(product_base_id: any){
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.where('product_base_id', product_base_id).update({'deleted_at': DB.fn.now()}).then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }
}



