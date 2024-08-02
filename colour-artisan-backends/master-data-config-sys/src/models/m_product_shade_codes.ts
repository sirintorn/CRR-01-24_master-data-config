import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from '../../db/db';

export interface ProductShadeCode extends TableRecord {
    db_version_id: any,
    product_group_id: any,
    product_id: any,
    shade_code: string,
    shade_name: string,
    product_base_id: any,
    sub_product_id: any,
    can_size_id: any,
    red: number,
    green: number,
    blue: number,
    remark: string,
}

export interface SearchFilters {
    keywords: string,
    product_group_id: string,
    product_id: string,
    sub_product_id: string,
    product_base_id: string
}

export interface PaginationConfig {
    limit: number,
    offset: number
}

export class ProductShadeCodesSchema extends TableRecordsSchema {
    constructor() {
        super(TABLE_NAMES.ProductShadeCodes);
    }

    getAll(): Promise<ProductShadeCode[]> {
        return super.getAll();
    }

    get(id: any): Promise<ProductShadeCode> {
        return super.get(id);
    }

    create(data: ProductShadeCode): Promise<any[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const table = DB<any>(this.tableName);
                const vals = await table.select('*').where('db_version_id', data.db_version_id).where('shade_code', data.shade_code).orWhere('shade_name', data.shade_name).where('deleted_at', null);
                if (vals.length > 0) {
                    reject({ status: 409 });
                } else {
                    const result = await super.create(data, true);
                    resolve(result);
                }
            } catch (error: any) {
                reject({ status: 400, error: error });
            }
        });
        //return super.create(data, true);
    }

    update(id: any, data: ProductShadeCode): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const table = DB<any>(this.tableName);
                const vals = await table.select('*').where('db_version_id', data.db_version_id).where('shade_code', data.shade_code).orWhere('shade_name', data.shade_name).where('deleted_at', null);
                const old = await this.get(id);
                if (vals.length > 0 && old.shade_code != data.shade_code && old.shade_name != old.shade_name) {
                    reject({ status: 409 });
                } else {
                    const result = await super.update(id, data);
                    resolve(result);
                }
            } catch (error: any) {
                reject({ status: 400 });
            }
        });
        //return super.update(id, data);
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }


    /// BUSINESS LOGICS
    getByDBVersion(db_version_id: any): Promise<ProductShadeCode[]> {
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.select('*').where('db_version_id', db_version_id).where('deleted_at', null).then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }

    getByDBVersionFilteredX(db_version_id: any, searchFilters: SearchFilters, paginationConfig: PaginationConfig): Promise<any> {
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.select('*');
            table.where('db_version_id', db_version_id);
            table.where('deleted_at', null);

            //Query Builder on Search Filters
            if (searchFilters.keywords != '') {
                table
                    .where('shade_code', `%${searchFilters.keywords}%`)
                    .where('shade_name', `%${searchFilters.keywords}%`);
            }
            if (searchFilters.product_group_id != '') {
                table.where('product_group_id', searchFilters.product_group_id);
            }
            if (searchFilters.product_id != '') {
                table.where('product_id', searchFilters.product_id);
            }
            if (searchFilters.sub_product_id != '') {
                table.where('sub_product_id', searchFilters.sub_product_id)
            }
            if (searchFilters.product_base_id != '') {
                table.where('product_base_id', searchFilters.product_base_id);
            }


            //Query Builder on PaginationConfig
            if (paginationConfig.offset) {
                table.offset(paginationConfig.offset, { skipBinding: true })
            }
            if (paginationConfig.limit) {
                table.limit(paginationConfig.limit, { skipBinding: true })
            }

            table.orderBy('updated_at', 'desc');
            resolve(table.toQuery())
        })
    }

    getByDBVersionFiltered(db_version_id: any, searchFilters: SearchFilters, paginationConfig: PaginationConfig): Promise<ProductShadeCode[]> {
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.select('*');
            table.where('db_version_id', db_version_id);
            table.where('deleted_at', null);

            //Query Builder on Search Filters
            if (searchFilters.keywords != '') {
                table
                    .whereILike('shade_code', `%${searchFilters.keywords}%`)
                    .whereILike('shade_name', `%${searchFilters.keywords}%`);
            }
            if (searchFilters.product_group_id != '') {
                table.where('product_group_id', searchFilters.product_group_id);
            }
            if (searchFilters.product_id != '') {
                table.where('product_id', searchFilters.product_id);
            }
            if (searchFilters.sub_product_id != '') {
                table.where('sub_product_id', searchFilters.sub_product_id)
            }
            if (searchFilters.product_base_id != '') {
                table.where('product_base_id', searchFilters.product_base_id);
            }


            //Query Builder on PaginationConfig
            if (paginationConfig.offset) {
                table.offset(paginationConfig.offset, { skipBinding: true })
            }
            if (paginationConfig.limit) {
                table.limit(paginationConfig.limit, { skipBinding: true })
            }

            table.orderBy('updated_at', 'desc');
            table.then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        })
    }

    getByDBVersionFilteredCount(db_version_id: any, searchFilters: SearchFilters): Promise<any> {
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.count('*');
            table.where('db_version_id', db_version_id);
            table.where('deleted_at', null);

            //Query Builder on Search Filters
            if (searchFilters.keywords != '') {
                table
                .whereILike('shade_code', `%${searchFilters.keywords}%`)
                .whereILike('shade_name', `%${searchFilters.keywords}%`);
            }
            if (searchFilters.product_group_id != '') {
                table.where('product_group_id', searchFilters.product_group_id);
            }
            if (searchFilters.product_id != '') {
                table.where('product_id', searchFilters.product_id);
            }
            if (searchFilters.sub_product_id != '') {
                table.where('sub_product_id', searchFilters.sub_product_id)
            }
            if (searchFilters.product_base_id != '') {
                table.where('product_base_id', searchFilters.product_base_id);
            }

            table.then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        })
    }

    deleteMultiple(ids: any[]): Promise<any> {
        return super.deleteMultiple(ids);
    }


}



