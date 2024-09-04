/**
 * @swagger
 * components:
 *   schemas:
 *     DBVersion:
 *       type: object
 *       required:
 *         - company_id
 *         - name
 *         - db_version
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of a record
 *         company_id:
 *           type: integer
 *           description: The company id 
 *         name:
 *           type: string
 *           description: The title of your book
 *         db_version:
 *           type: string
 *           description: version of the record
 *         created_by:
 *           type: integer
 *           description: the id of the user that creates
 *         updated_by:
 *           type: integer
 *           description: the id of the user that updates
 *         created_at:
 *           type: string
 *           format: date
 *           description: The date the record was added
 *         updated_at:
 *           type: string
 *           format: date
 *           description: The date the record was updated
 *       example:
 *         company_id: 1
 *         name: TOA NEW COLOR
 *         db_version: 2024-07-04
 */

/**
 * @swagger
 * tags:
 *   name: DB_Versions
 *   description: The DB Version Managing API
 * /api/db-versions:
 *   post:
 *     summary: Create a new DB_Version
 *     tags: [DB_Versions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DBVersion'
 *     responses:
 *       200:
 *         description: The created record id.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/POSTResponse'
 *       400:
 *         description: bad request
 *       500:
 *         description: server error
 *
 */
import { Router } from "express";
import { DBVersion, DBVersionsSchema } from "../models/m_db_versions";
import { DBConfigsSchema } from "../models/m_db_configs";
import { CONFIGS_COPY } from "../configs/db_config_structure";

export const DBVersionsRoute = Router();

const path = '/db-versions';

//GET ALL
DBVersionsRoute.route(path).get(async (req, res) => {
    try {
        const table = new DBVersionsSchema();
        const result: DBVersion[] = await table.getAll();
        res.status(200).json(result);   
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//GET
DBVersionsRoute.route(path + '/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new DBVersionsSchema();
        const result: DBVersion = await table.get(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//CREATE
DBVersionsRoute.route(path).post(async (req, res) => {
    //res.set('Access-Control-Allow-Origin', '*');
    try {
        const data = req.body;
        const table = new DBVersionsSchema();
        const result1: any = await table.create(data);

        const id = result1[0].id;
        const dbConfigSchema = await new DBConfigsSchema();
        const result2: any = await dbConfigSchema.create(dbConfigSchema.generateDefaultConfig(id));

        const result = {
            db_version: result1,
            db_configs: result2
        }


        if(result1)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        if(error.status && error.status == 409) res.status(409).send();
        else res.status(400).send(error);
    }
});

//UPDATE
DBVersionsRoute.route(path + '/:id').put(async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const table = new DBVersionsSchema();
        const result: any = await table.update(id, data);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        if(error.status && error.status == 409) res.status(409).send();
        else res.status(400).send(error);
    }
});

//DELETE
DBVersionsRoute.route(path + '/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new DBVersionsSchema();
        const result: any = await table.delete(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

// RESTORE
DBVersionsRoute.route(path + '/:id').patch(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new DBVersionsSchema();
        const result: any = await table.restore(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});


//////BUSINESS LOGICS 

//GET BY COMPANY ID
DBVersionsRoute.route(path + '/by-company/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new DBVersionsSchema();
        const result: Array<DBVersion> = await table.getByCompanyId(id);
        res.status(200).json(result);   
    } catch (error: any) {
        res.status(400).send(error);
    }
});