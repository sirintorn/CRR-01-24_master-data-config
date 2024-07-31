import { Router } from "express";
import { CanSize, CanSizesSchema } from "../models/m_can_sizes";
import { GeneralPricingsSchema } from "../models/m_general_pricings";
import { ProductBasePricingsSchema } from "../models/m_product_base_pricings";
import { ProductBasesSchema } from "../models/m_product_bases";
import { CanUnitsSchema } from "../models/m_can_units";

export const CanSizesRoute = Router();

const path = '/can-sizes';

//GET ALL
CanSizesRoute.route(path).get(async (req, res) => {
    try {
        const table = new CanSizesSchema();
        const result: CanSize[] = await table.getAll();
        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//GET
CanSizesRoute.route(path + '/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new CanSizesSchema();
        const result: CanSize = await table.get(id);
        if (result) res.status(200).json(result);
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//CREATE
CanSizesRoute.route(path).post(async (req, res) => {
    try {
        const data = req.body;
        const table = new CanSizesSchema();
        const result1: any = await table.create(data);

        const db_version_id = data.db_version_id;
        const can_size_id = result1[0].id;

        //also create general pricing
        const gpS = new GeneralPricingsSchema();
        const result2 = await gpS.create(gpS.generateRecord(db_version_id, can_size_id));

        //also create product base pricing
        const pbS = new ProductBasesSchema();
        const productBases = await pbS.getByDBVersion(db_version_id);

        const pbpS = new ProductBasePricingsSchema();
        let records = [] as any[];

        for (let i = 0; i < productBases.length; i++) {
            const item = productBases[i];
            records.push(pbpS.generateRecord(db_version_id, item.id, can_size_id));
        }
        const result3 = await pbpS.createMultiple(records, true);

        const result = {
            can_size: result1,
            general_pricing: result2,
            product_base_pricings: result3
        };

        if (result) res.status(200).json(result);
        else res.status(404).send();
    } catch (error: any) {
        if(error.status && error.status == 409) res.status(409).send();
        res.status(400).send(error);
    }
});

//UPDATE
CanSizesRoute.route(path + '/:id').put(async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const table = new CanSizesSchema();
        const result: any = await table.update(id, data);
        if (result) res.status(200).json(result);
        else res.status(404).send();
    } catch (error: any) {
        if(error.status && error.status == 409) res.status(409).send();
        res.status(400).send(error);
    }
});

//DELETE
CanSizesRoute.route(path + '/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new CanSizesSchema();
        const result1: any = await table.delete(id);

        //also delete general pricing
        const gpS = new GeneralPricingsSchema();
        const result2 = await gpS.delete(id);

        //also delete product base pricing
        const pbpS = new ProductBasePricingsSchema();
        const result3 = await pbpS.deleteByCanSize(id);

        const result = {
            can_size: result1,
            general_pricing: result2,
            product_base_pricings: result3
        };

        if (result) res.status(200).json(result);
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

// RESTORE
CanSizesRoute.route(path + '/:id').patch(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new CanSizesSchema();
        const result: any = await table.restore(id);
        if (result) res.status(200).json(result);
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

///BUSINESS LOGICS
//GET BY DB VERSION
CanSizesRoute.route(path + '/by-db-version/:db_version_id').get(async (req, res) => {
    try {
        const db_version_id = req.params.db_version_id;

        const table = new CanSizesSchema();
        const result: Array<any> = await table.getByDBVersion(db_version_id);

        const canUnitsSchema = new CanUnitsSchema();
        const canUnits = await canUnitsSchema.getByDBVersion(db_version_id);
        for (let i = 0; i < result.length; i++) {
            const record = result[i];
            
            const cu = canUnits.find((value) => {
                if(value.id == record.can_unit_id) return value;
            });

            record["_data"] = {
                can_unit: cu
            };
        }

        if (result) res.status(200).json(result);
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

///DELETE MULTIPLE
CanSizesRoute.route(path + '/multiple/delete').delete(async (req, res) => {
    try {
        const ids = req.body as any[];
        const table = new CanSizesSchema();
        const result1: any = await table.deleteMultiple(ids);

        //also delete general pricing
        const gpS = new GeneralPricingsSchema();
        const result2 = await gpS.deleteMultiple(ids);

        //also delete product base pricing
        const pbpS = new ProductBasePricingsSchema();
        const result3 = await pbpS.deleteByCanSizesMultiple(ids);

        const result = {
            can_size: result1,
            general_pricing: result2,
            product_base_pricings: result3
        };

        if (result) res.status(200).json(result);
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});