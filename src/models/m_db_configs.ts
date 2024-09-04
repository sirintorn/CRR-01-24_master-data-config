import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from '../../db/db';
import { CONFIGS } from '../configs/configs';

export interface DBConfig extends TableRecord {
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
    general_price_markup_price: number,
    base_price_markup_price: number,
    base_price_markup_price_mode: any,
    base_price_visible: boolean,
    display_unit: string,
    custom_ml_oz_unit: number,
}

export class DBConfigsSchema extends TableRecordsSchema {

    constructor() {
        super(TABLE_NAMES.DBConfigs);
    }

    getAll(): Promise<DBConfig[]> {
        return super.getAll();
    }

    get(id: any): Promise<DBConfig> {
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            //if the record was marked as deleted. it wont be quried.
            table.select('*').where('id', id).where('deleted_at', null).then(async (val) => {
                if (val.length > 0) {
                    resolve(val[0]);
                } else {
                    const newConfig: DBConfig = this.generateDefaultConfig(id);
                    await super.create(newConfig);
                    resolve(newConfig);
                }
            }).catch(error => {
                reject(error);
            });
        });
    }

    create(data: DBConfig): Promise<any[]> {
        return super.create(data, false);
    }

    update(id: any, data: DBConfig): Promise<any> {
        return super.update(id, data);
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }

    generateDefaultConfig(db_version_id: any) {
        const dbConfig = CONFIGS.dbConfig;
        const newConfig: DBConfig = {
            id: db_version_id,
            db_version_id: db_version_id,
            can_size_lookup_mode: dbConfig.canSizeLookupModes.all,
            can_size_lookup_key: dbConfig.canSizeLookupKey.product,
            discount: dbConfig.discount,
            discount_visible: dbConfig.discountVisible,
            vat: dbConfig.vat,
            vat_visible: dbConfig.vatVisible,
            total_price_rounding: dbConfig.totalPriceRounding,
            total_price_visible: dbConfig.totalPriceVisible,
            tinter_price_markup_price: dbConfig.tinterPriceMarkupPrice,
            tinter_price_markup_price_mode: dbConfig.tinterPriceMarkupPriceModes.default,
            tinter_price_visible: dbConfig.tinterPriceVisible,
            base_price_lookup_mode: dbConfig.basePriceLookupModes.generalPricing,
            general_price_markup_price: dbConfig.generalPriceMarkupPrice,
            base_price_markup_price: dbConfig.basePriceMarkupPrice,
            base_price_markup_price_mode: dbConfig.basePriceMarkupPriceModes.default,
            base_price_visible: dbConfig.basePriceVisible,
            display_unit: dbConfig.displayUnits.ml,
            custom_ml_oz_unit: dbConfig.customMlOzUnit,
        }
        return newConfig;
    }
}



