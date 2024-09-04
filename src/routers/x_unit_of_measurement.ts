import { Router } from "express";
import { DBConfig, DBConfigsSchema } from "../models/m_db_configs";
import { CanUnit, CanUnitsSchema } from "../models/m_can_units";

export const XUnitOfMeasurementRoute = Router();

const path = '/unit-of-measurement';

XUnitOfMeasurementRoute.route(path + '/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const dbConfigSchema = new DBConfigsSchema();
        const canUnitsSchema = new CanUnitsSchema();

        const dbConfig: DBConfig = await dbConfigSchema.get(id);
        const canUnits: Array<CanUnit> = await canUnitsSchema.getByDBVersion(id);
        const result = {
            dbConfig: dbConfig,
            canUnits: canUnits
        };
        res.status(200).json(result);   
    } catch (error: any) {
        res.status(400).send(error);
    }
});


