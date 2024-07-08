import * as knex from "knex";
import * as knexFile from '../knexfile';

const environment = process.env.NODE_ENV || "development";

export const DB = knex.knex(knexFile.default[environment]);

export const TABLE_NAMES = {
    DBVersions: 'DBVersions',
    CanSizes: 'CanSizes',
    CanUnits: 'CanUnits',
    ProductCanSizes: 'ProductCanSizes',
    ProductGroups: 'ProductGroups',
    Products: 'Products',
    ProductBases: 'ProductBases',
    SubProducts: 'SubProducts',
    ProductShadeCodes: 'ProductShadeCodes',
    ProductTinters: 'ProductTinters',
    GeneralPricings: 'GeneralPricings',
    ProductBasePricings: 'ProductBasePricings',
    TinterPricings: 'TinterPricings',
}

export interface TableRecord{
    id: any,
    created_by: any,
    updated_by: any,
    created_at: any,
    updated_at: any,
    deleted_by: any,
    deleted_at: any,
}

export class TableRecordsSchema{
    tableName: string = 'default';

    constructor(tableName: string){
        this.tableName = tableName;    
    }

    getAll(): Promise<any[]>{
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.select('*').then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }

    get(id: any): Promise<any>{
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.select('*').where('id', id).then((val) => {
                if(val.length > 0)resolve(val[0]);
                else resolve(null);
            }).catch(error => {
                reject(error);
            });
        });
    }

    create(data: any): Promise<any>{
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            //insert data and ask to return id[]
            table.insert(data, ['id']).then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }

    update(id: any, data: any): Promise<any>{
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.where('id', id).update(data, ['id', 'updated_by', 'updated_at']).then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }

    delete(id: any): Promise<any>{
        return new Promise((resolve, reject) => {
            const table = DB<any>(this.tableName);
            table.where('id', id).delete().then((val) => {
                resolve(val);
            }).catch(error => {
                reject(error);
            });
        });
    }

}

//to generate new migration
// $ knex migrate:make migration_name -x ts