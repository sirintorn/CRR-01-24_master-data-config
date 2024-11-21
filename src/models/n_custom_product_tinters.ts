import {DB, TABLE_NAMES, TableRecord, TableRecordsSchema} from '../../db/db';

export interface CustomProductTinter extends TableRecord{
    machine_id: any, //indicator to its creator
    db_version_id: any,
    product_shade_code_id: any,
    tinter_code: string,
    amount: number,
    sg: number,
    red: number,
    green: number,
    blue: number,
}

export class CustomProductTintersSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.CustomProductTinters);
    }

    getAll(): Promise<CustomProductTinter[]>{
        return super.getAll();
    }

    get(id: any): Promise<CustomProductTinter>{
        return super.get(id);
    }

    create(data: CustomProductTinter): Promise<any[]>{
        return super.create(data, true);
    }

    update(id: any, data: CustomProductTinter): Promise<any>{
        return super.update(id, data);
    }

    delete(id: any): Promise<any> {
        return super.delete(id);
    }



    ///BUSINESS LOGICS
    getByDBVersion(db_version_id: any): Promise<CustomProductTinter[]> {
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
    getByProductShadeCode(product_shade_code_id: any): Promise<CustomProductTinter[]>{
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

    deleteByMachine(machine_id: any): Promise<any>{
        return new Promise((resolve, reject) => {
            const table = DB<CustomProductTinter>(this.tableName);
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

    getByDBVersionAndMachine(db_version_id: any, machine_id: any): Promise<CustomProductTinter[]>{
        return new Promise((resolve, reject) => {
            const table = DB<CustomProductTinter>(this.tableName);
            table.select('*')
            .where('deleted_at', null)
            .where('db_version_id', db_version_id)
            .where('machine_id', machine_id)
            .then(vals => {
                resolve(vals);
            }).catch(error => {
                reject(error);
            });
        });
    }
}



