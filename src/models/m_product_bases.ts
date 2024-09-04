import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from '../../db/db';

export interface ProductBase extends TableRecord {
    db_version_id: any,
    product_group_id: any,
    product_id: any,
    sub_product_id: any,
    name: string,
}

export class ProductBasesSchema extends TableRecordsSchema {
    constructor() {
        super(TABLE_NAMES.ProductBases);
    }

    getAll(): Promise<ProductBase[]> {
        return super.getAll();
    }

    get(id: any): Promise<ProductBase> {
        return super.get(id);
    }

    create(data: ProductBase): Promise<any[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const table = DB<any>(this.tableName);
                const vals = await table.select('*').where('db_version_id', data.db_version_id).where('name', data.name).where('deleted_at', null);
                if(vals.length > 0){
                    reject({status: 409});
                }else{
                    const result = await super.create(data, true);  
                    resolve(result);  
                }
            } catch (error: any) {
                reject({status: 400});
            }
        });
    }

    update(id: any, data: ProductBase): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const table = DB<any>(this.tableName);
                const vals = await table.select('*').where('db_version_id', data.db_version_id).where('name', data.name).where('deleted_at', null);
                const old = await this.get(id);
                if(vals.length > 0 && old.name != data.name){
                    reject({status: 409});
                }else{
                    const result = await super.update(id, data);  
                    resolve(result);  
                }
            } catch (error: any) {
                reject({status: 400});
            }
        });
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }

    ////BUSINESS LOGICS
    getByDBVersion(db_version_id: any): Promise<ProductBase[]> {
        return new Promise((resolve, reject) => {
            DB.raw(`select a.*, (select COUNT(k.*) 
                from "${TABLE_NAMES.ProductShadeCodes}" as k where a.id = k.product_base_id) AS products 
                from "${this.tableName}" as a where deleted_at is NULL and db_version_id = '${db_version_id}'
                order by a.updated_at DESC;`)
                .then(val => {
                    resolve(val["rows"]);
                }).catch(error => {
                    reject(error);
                });
                
            /*const table = DB<any>(this.tableName);
            table.select('*').where('db_version_id', db_version_id).where('deleted_at', null).then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });*/
        });
    }

    getByDBVersionLite(db_version_id: any): Promise<ProductBase[]> {
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.select('*').where('db_version_id', db_version_id).where('deleted_at', null).then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
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
}



