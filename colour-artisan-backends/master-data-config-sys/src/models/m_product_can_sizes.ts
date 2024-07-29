import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from '../../db/db';

export interface ProductCanSize extends TableRecord {
    db_version_id: any,
    can_size_id: any,
    product_id: any,
    name: string,
}

export class ProductCanSizesSchema extends TableRecordsSchema {
    constructor() {
        super(TABLE_NAMES.ProductCanSizes);
    }

    getAll(): Promise<ProductCanSize[]> {
        return super.getAll();
    }

    get(id: any): Promise<ProductCanSize> {
        return super.get(id);
    }

    create(data: ProductCanSize): Promise<any[]>{
        return new Promise(async (resolve, reject) => {
            try {
                const table = DB<any>(this.tableName);
                const vals = await table.select('*').where('db_version_id', data.db_version_id).where('product_id', data.product_id).where('can_size_id', data.can_size_id).where('deleted_at', null);
                if(vals.length > 0){
                    reject({status: 409});
                }else{
                    const result = await super.create(data, true);  
                    resolve(result);  
                }
            } catch (error: any) {
                reject({status: 400, error: error});
            }
        });
    }

    update(id: any, data: ProductCanSize): Promise<any>{
        return new Promise(async (resolve, reject) => {
            try {
                const table = DB<any>(this.tableName);
                const vals = await table.select('*').where('db_version_id', data.db_version_id).where('product_id', data.product_id).where('can_size_id', data.can_size_id).where('deleted_at', null);
                if(vals.length > 0){
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

    deleteMultiple(ids: any[]): Promise<any> {
        return super.deleteMultiple(ids);
    }

    ////BUSINESS LOGICS
    getByDBVersion(db_version_id: any): Promise<any[]> {
        return new Promise((resolve, reject) => {
            /*DB.raw(`select a.*, 
                    (select name from "${TABLE_NAMES.Products}" where id = a.product_id) as product_name, 
                    (select display_name from "${TABLE_NAMES.CanSizes}" where id = a.can_size_id) as can_size_display_name  
                    from "${this.tableName}" as a
                    where a.product_id = b.id and a.can_size_id = c.id and deleted_at is NULL and db_version_id = '${db_version_id}' 
                    order by product_id DESC;`)
                .then(val => {
                    resolve(val["rows"]);
                }).catch(error => {
                    reject(error);
                });*/

            const table = DB<any>(this.tableName);
            table.select(`*`)
            .where(`db_version_id`, db_version_id)
            .where(`deleted_at`, null)
            .orderBy(`product_id`, 'asc')
            .then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }
}



