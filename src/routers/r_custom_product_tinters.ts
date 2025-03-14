import { Router } from "express";
import { CustomProductTinter, CustomProductTintersSchema } from "../models/n_custom_product_tinters";
import { DtoCustomProductTinter } from "../dtos/dto_custom_product_tinters";


export const CustomProductTintersRoute = Router();

const path = '/custom/product-tinters';

//GET ALL
CustomProductTintersRoute.route(path).get(async (req, res) => {
    try {
        const table = new CustomProductTintersSchema();
        const result: CustomProductTinter[] = await table.getAll();
        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//GET
CustomProductTintersRoute.route(path + '/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new CustomProductTintersSchema();
        const result: CustomProductTinter = await table.get(id);
        if (result) res.status(200).json(result);
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//CREATE
CustomProductTintersRoute.route(path).post(async (req, res) => {
    try {
        const data = req.body;
        const table = new CustomProductTintersSchema();
        const result: any = await table.create(data);
        if (result) res.status(200).json(result);
        else res.status(404).send();
    } catch (error: any) {
        if(error.status && error.status == 409) res.status(409).send();
        else res.status(400).send(error);
    }
});

//UPDATE
CustomProductTintersRoute.route(path + '/:id').put(async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const table = new CustomProductTintersSchema();
        const result: any = await table.update(id, data);
        if (result) res.status(200).json(result);
        else res.status(404).send();
    } catch (error: any) {
        if(error.status && error.status == 409) res.status(409).send();
        else res.status(400).send(error);
    }
});

//DELETE
CustomProductTintersRoute.route(path + '/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new CustomProductTintersSchema();
        const result: any = await table.delete(id);
        if (result) res.status(200).json(result);
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

// RESTPRE
CustomProductTintersRoute.route(path + '/:id').patch(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new CustomProductTintersSchema();
        const result: any = await table.restore(id);
        if (result) res.status(200).json(result);
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});


///BUSINESS LOGICS
///CREATE MULTIPLE
CustomProductTintersRoute.route(path + '/multiple/create').post(async (req, res) => {
    try {
        const datas = req.body as any[];
        const table = new CustomProductTintersSchema();
        const result: any = await table.createMultiple(datas);
        if (result) res.status(200).json(result);
        else res.status(404).send();
    } catch (error: any) {
        if (error.status && error.status == 409) res.status(409).send();
        res.status(400).send(error);
    }
});

///UPDATE MULTIPLE SMART
CustomProductTintersRoute.route(path + '/multiple/smart').put(async (req, res) => {
    try {
        const datas = req.body as any[];
        const _creates: any[] = [];
        const _deletes: any[] = [];
        const _updates: any[] = [];

        for (let i = 0; i < datas.length; i++) {
            let item = datas[i];
            if (item._status && item._status == 'create') {
                _creates.push(item);
            } else if (item._status && item._status == 'delete') {
                _deletes.push(item.id); //deleteMultiple only need ids
            } else {
                _updates.push(item);
            }
            delete item._status;
        }

        const table = new CustomProductTintersSchema();

        const resultCreates: any = await table.createMultiple(_creates);
        const resultDeletes: any = await table.deleteMultiple(_deletes);
        let resultUpdates: any[] = [];
        for (let k = 0; k < _updates.length; k++) {
            const item = _updates[k];
            const result: any = await table.update(item.id, item);
            resultUpdates.push(result)
        }

        let result = {
            _creates: resultCreates,
            _deletes: resultDeletes,
            _updates: resultUpdates
        };

        res.status(200).json(result);

    } catch (error: any) {
        if (error.status && error.status == 409) res.status(409).send();
        res.status(400).send(error);
    }
});

///GET BY PRODUCT SHADE CODE
CustomProductTintersRoute.route(path + '/by-product-shade-code/:product_shade_code_id').get(async (req, res) => {
    try {
        const product_shade_code_id = req.params.product_shade_code_id
        const table = new CustomProductTintersSchema()
        const result = await table.getByProductShadeCode(product_shade_code_id)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

///[DTO] GET BY PRODUCT SHADE CODE
CustomProductTintersRoute.route(path + '/by-product-shade-code/:product_shade_code_id/dto').get(async (req, res) => {
    try {
        const product_shade_code_id = req.params.product_shade_code_id
        const table = new CustomProductTintersSchema()
        const result = await table.getByProductShadeCode(product_shade_code_id);
        const result_final = DtoCustomProductTinter.parseFromArray(result);

        res.status(200).json(result_final);
    } catch (error) {
        res.status(400).send(error);
    }
});

//[DTO] GET BY DB VERSION & MACHINE
CustomProductTintersRoute.route(path + '/by-db-version/:db_version_id/by-machine/:machine_id/dto').get(async (req, res) => {
    try {
        const db_version_id = req.params.db_version_id;
        const machine_id = req.params.machine_id;

        const table = new CustomProductTintersSchema();
        const items: any[]  = await table.getByDBVersionAndMachine(db_version_id, machine_id);

        const result = DtoCustomProductTinter.parseFromArray(items);

        if(result)res.status(200).json(result);   
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});