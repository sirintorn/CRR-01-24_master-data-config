import { PostGreSQLDB } from "../services/postgres";

export interface DBVersion {
    ID: number,
    Company_ID: number,
    Name: string,
    DB_Version: string,
    Created_At: any,
    Updated_At: any,
    Created_By: number,
    Updated_By: number
}

export class DBVersionSchema {
    static TABLE_NAME: string = 'DB_Versions';

    static getAll(dbClient: PostGreSQLDB) {
        return new Promise((resolve, reject) => {
            dbClient.client.query(`SELECT * FROM "${dbClient.schema}"."${DBVersionSchema.TABLE_NAME}"`, (err: any, result: any) => {
                if (err) {
                    console.error('Error executing query', err);
                    reject(err);
                } else {
                    console.log('Query result:', result.rows);
                    resolve(result.rows as Array<DBVersion>);
                }
            });
        });
    }

    static getByID(dbClient: PostGreSQLDB, id: string) {
        return new Promise((resolve, reject) => {
            dbClient.client.query(`SELECT * FROM "${dbClient.schema}"."${DBVersionSchema.TABLE_NAME}" WHERE "ID"=${id}`, (err: any, result: any) => {
                if (err) {
                    console.error('Error executing query', err);
                    reject(err);
                } else {
                    if (result.rows[0]) {
                        console.log('Query result:', result.rows[0]);
                        resolve(result.rows[0] as DBVersion);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    static create(dbClient: PostGreSQLDB, data: DBVersion) {
        
    }

    static update(dbClient: PostGreSQLDB, id: string, data: DBVersion) {

    }

    static delete(dbClient: PostGreSQLDB, id: string) {

    }
}