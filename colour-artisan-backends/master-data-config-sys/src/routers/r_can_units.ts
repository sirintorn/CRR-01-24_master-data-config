import { Router } from "express";
import { CanUnit, CanUnitsSchema } from "../models/m_can_units";

export const CanUnitsRoute = Router();

const path = '/can-units';

//GET ALL
CanUnitsRoute.route(path).get(async (req, res) => {
    try {
        const table = new CanUnitsSchema();
        const result: CanUnit[] = await table.getAll();
        res.status(200).json(result);   
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//GET
CanUnitsRoute.route(path + '/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new CanUnitsSchema();
        const result: CanUnit = await table.get(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//CREATE
CanUnitsRoute.route(path).post(async (req, res) => {
    try {
        const data = req.body as CanUnit;
        const table = new CanUnitsSchema();
        const result: any = await table.create(data);
        if(result){
            res.status(200).json(result);   
        } else { 
            res.status(404).send();
        }
    } catch (error: any) {
         if(error.status && error.status == 409) res.status(409).send();
        else res.status(400).send(error);
    }
});

//UPDATE
CanUnitsRoute.route(path + '/:id').put(async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const table = new CanUnitsSchema();
        const result: any = await table.update(id, data);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        if(error.status && error.status == 409) res.status(409).send();
        res.status(400).send(error);
    }
});

//DELETE
CanUnitsRoute.route(path + '/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new CanUnitsSchema();
        const result: any = await table.delete(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

// RESTORE
CanUnitsRoute.route(path + '/:id').patch(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new CanUnitsSchema();
        const result: any = await table.restore(id);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//DELETE MULTIPLE
CanUnitsRoute.route(path).delete(async (req, res) => {
    try {
        //res.send('thanks');
        const ids = req.body as any[];
        const table = new CanUnitsSchema();
        const result: any = await table.deleteMultiple(ids);
        if(result)res.status(200).json(result);   
        else res.status(404).send('not found');
    } catch (error: any) {
        res.status(400).send(error);
    }
});


//BUSINESS LOGICS
CanUnitsRoute.route(path + '/by-db-version/:db_version_id').get(async (req, res) => {
    try {
        const db_version_id = req.params.db_version_id;

        const table = new CanUnitsSchema();
        const result: Array<CanUnit> = await table.getByDBVersion(db_version_id);

        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});