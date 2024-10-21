import {DB, TABLE_NAMES, TableRecord, TableRecordsSchema} from '../../db/db';

export interface ProductTinter extends TableRecord{
    db_version_id: any,
    product_shade_code_id: any,
    tinter_code: string,
    amount: number,
    sg: number,
    red: number,
    green: number,
    blue: number,
}

export class ProductTintersSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.ProductTinters);
    }

    getAll(): Promise<ProductTinter[]>{
        return super.getAll();
    }

    get(id: any): Promise<ProductTinter>{
        return super.get(id);
    }

    create(data: ProductTinter): Promise<any[]>{
        return super.create(data, true);
    }

    update(id: any, data: ProductTinter): Promise<any>{
        //return new Promise((resolve, reject) => {
        //    const table = DB<ProductTinter>(this.tableName);
        //    resolve(table.update(data)
        //    .where('id', id)
        //    .toQuery())
        //});
        return super.update(id, data);
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }



    ///BUSINESS LOGICS
    getByDBVersion(db_version_id: any): Promise<ProductTinter[]> {
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.select('*').where('db_version_id', db_version_id).where('deleted_at', null).then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }

    ///CREATE MULTIPLE
    createMultiple(datas: any[]): Promise<any[]>{
        return super.createMultiple(datas, true);
    }

    ///GET BY PRODUCT SHADE CODE
    getByProductShadeCode(product_shade_code_id: any): Promise<ProductTinter[]>{
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.select('*').where('product_shade_code_id', product_shade_code_id).where('deleted_at', null).then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        })
    }


    ///DELETE MULTPLES
    deleteMultiple(ids: any[]): Promise<any> {
        return super.deleteMultiple(ids)
    }

    ///DELETE BY PRODUCT SHADE CODE
    deleteByProductShadeCode(product_shade_code_id: any): Promise<any>{
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            //not an actual delete, just symbolically delete
            table.where('product_shade_code_id', product_shade_code_id).update({'deleted_at': DB.fn.now()}).then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }

    deleteByProductShadeCodesMultiple(ids: any[]): Promise<any>{
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            //not an actual delete, just symbolically delete
            table.whereIn('product_shade_code_id', ids).update({'deleted_at': DB.fn.now()}).then((val) => {
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



