import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from '../../db/db';
import { PaginationConfig, SearchFilters } from './m_product_shade_codes';

export interface CustomProductShadeCode extends TableRecord {
    machine_id: any, //indicator to its creator
    db_version_id: any,
    product_group_id: any,
    product_id: any,
    shade_code: string,
    shade_name: string,
    product_base_id: any,
    sub_product_id: any,
    can_size_id: any,
    custom_can_size_ml: number,
    red: number,
    green: number,
    blue: number,
    remark: string,
}

export class CustomProductShadeCodesSchema extends TableRecordsSchema {
    constructor() {
        super(TABLE_NAMES.CustomProductShadeCodes);
    }

    getAll(): Promise<CustomProductShadeCode[]> {
        return super.getAll();
    }

    get(id: any): Promise<CustomProductShadeCode> {
        return super.get(id);
    }

    create(data: CustomProductShadeCode): Promise<any[]> {
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

    update(id: any, data: CustomProductShadeCode): Promise<any> {
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
    getByDBVersion(db_version_id: any): Promise<CustomProductShadeCode[]> {
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

    getByDBVersionFiltered(db_version_id: any, searchFilters: SearchFilters, paginationConfig: PaginationConfig): Promise<CustomProductShadeCode[]> {
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

    getByMachineFiltered(machine_id: any, searchFilters: SearchFilters, paginationConfig: PaginationConfig): Promise<CustomProductShadeCode[]> {
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.select('*');
            table.where('machine_id', machine_id);
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

    getByMachineFilteredCount(machine_id: any, searchFilters: SearchFilters): Promise<any> {
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.count('*');
            table.where('machine_id', machine_id);
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

    deleteByDBVersion(db_version_id: any): Promise<any>{
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.update({deleted_at: DB.fn.now()})
            .where('db_version_id', db_version_id)
            .where('deleted_at', null)
            .then(val => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }

    deleteByMachine(machine_id: any): Promise<any>{
        return new Promise((resolve, reject) => {
            const table = DB<CustomProductShadeCode>(this.tableName);
            table.update({deleted_at: DB.fn.now()})
            .where('machine_id', machine_id)
            .where('deleted_at', null)
            .then(val => {
                resolve([]);
            }).catch(error => {
                reject(error);
            });
        });
    }

    forceDeleteByDBVersion(db_version_id: any): Promise<any>{
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.delete()
            .where('db_version_id', db_version_id)
            .then(val => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }

    getWhereIdsIn(ids: string[]): Promise<CustomProductShadeCode[]>{
        return new Promise((resolve, reject) => {
            const table = DB<CustomProductShadeCode>(this.tableName);
            table.select('*')
            .whereIn('id', ids)
            .where('deleted_at', null)
            .then((vals) => {
                resolve(vals);
            }).catch(error => {
                reject(error);
            });
        });
    }
}



