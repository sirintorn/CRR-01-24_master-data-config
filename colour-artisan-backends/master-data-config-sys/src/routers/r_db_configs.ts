/**
 * @swagger
 * components:
 *   schemas:
 *     DBConfig:
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
 *             $ref: '#/components/schemas/DBConfig'
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
import { DBConfig, DBConfigsSchema } from "../models/m_db_configs";

export const DBConfigsRoute = Router();

const path = '/db-configs';

//GET ALL
DBConfigsRoute.route(path).get(async (req, res) => {
    try {
        const table = new DBConfigsSchema();
        const result: DBConfig[] = await table.getAll();
        res.status(200).json(result);   
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//GET
DBConfigsRoute.route(path + '/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new DBConfigsSchema();
        const result: DBConfig = await table.get(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//CREATE
DBConfigsRoute.route(path).post(async (req, res) => {
    //res.set('Access-Control-Allow-Origin', '*');
    try {
        const data = req.body;
        const table = new DBConfigsSchema();
        const result: any = await table.create(data);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//UPDATE
DBConfigsRoute.route(path + '/:id').put(async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const table = new DBConfigsSchema();
        const result: any = await table.update(id, data);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//DELETE
DBConfigsRoute.route(path + '/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new DBConfigsSchema();
        const result: any = await table.delete(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

// RESTORE
DBConfigsRoute.route(path + '/:id').patch(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new DBConfigsSchema();
        const result: any = await table.restore(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});
