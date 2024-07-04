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
    } catch (error) {
        res.status(400).send();
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
    } catch (error) {
        res.status(400).send();
    }
});

//CREATE
CanUnitsRoute.route(path).post(async (req, res) => {
    try {
        const data = req.body as CanUnit;
        const table = new CanUnitsSchema();
        const result: any = await table.create(data);
        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error) {
        res.status(400).send();
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
    } catch (error) {
        res.status(400).send();
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
    } catch (error) {
        res.status(400).send();
    }
});