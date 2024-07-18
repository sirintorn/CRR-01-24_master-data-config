import {DB, TABLE_NAMES, TableRecord, TableRecordsSchema} from '../../db/db';

export interface Product extends TableRecord{
    db_version_id: any,
    product_group_id: any,
    name: string,
}

export class ProductsSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.Products);
    }

    getAll(): Promise<Product[]>{
        return super.getAll();
    }

    get(id: any): Promise<Product>{
        return super.get(id);
    }

    create(data: Product): Promise<any[]>{
        return super.create(data, true);
    }

    update(id: any, data: Product): Promise<any>{
        return new Promise(async (resolve, reject) => {
            try {
                const table = DB<any>(this.tableName);
                const vals = await table.select('*').where('db_version_id', data.db_version_id).where('name', data.name).where('deleted_at', null);
                if(vals.length > 0){
                    reject({status: 409});
                }else{
                    const result = await super.update(id, data);  
                    resolve(result);  
                }
            } catch (error) {
                throw error;
            }
        });
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }

    //BUSINESS LOGICS
    getByDBVersion(db_version_id: any): Promise<Product[]>{
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



