import { Router } from "express";
import { ProductTinter, ProductTintersSchema } from "../models/m_product_tinters";
import { DtoGetProductTinter } from "../dtos/dto_get_product_tinter";


export const ProductTintersRoute = Router();

const path = '/product-tinters';

//GET ALL
ProductTintersRoute.route(path).get(async (req, res) => {
    try {
        const table = new ProductTintersSchema();
        const result: ProductTinter[] = await table.getAll();
        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//GET
ProductTintersRoute.route(path + '/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new ProductTintersSchema();
        const result: ProductTinter = await table.get(id);
        if (result) res.status(200).json(result);
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

//CREATE
ProductTintersRoute.route(path).post(async (req, res) => {
    try {
        const data = req.body;
        const table = new ProductTintersSchema();
        const result: any = await table.create(data);
        if (result) res.status(200).json(result);
        else res.status(404).send();
    } catch (error: any) {
        if(error.status && error.status == 409) res.status(409).send();
        else res.status(400).send(error);
    }
});

//UPDATE
ProductTintersRoute.route(path + '/:id').put(async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const table = new ProductTintersSchema();
        const result: any = await table.update(id, data);
        if (result) res.status(200).json(result);
        else res.status(404).send();
    } catch (error: any) {
        if(error.status && error.status == 409) res.status(409).send();
        else res.status(400).send(error);
    }
});

//DELETE
ProductTintersRoute.route(path + '/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new ProductTintersSchema();
        const result: any = await table.delete(id);
        if (result) res.status(200).json(result);
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});

// RESTPRE
ProductTintersRoute.route(path + '/:id').patch(async (req, res) => {
    try {
        const id = req.params.id;
        const table = new ProductTintersSchema();
        const result: any = await table.restore(id);
        if (result) res.status(200).json(result);
        else res.status(404).send();
    } catch (error: any) {
        res.status(400).send(error);
    }
});


///BUSINESS LOGICS
///GET BY PRODUCT SHADE CODE
ProductTintersRoute.route(path + '/by-product-shade-code/:product_shade_code_id').get(async (req, res) => {
    try {
        const product_shade_code_id = req.params.product_shade_code_id
        const table = new ProductTintersSchema()
        const result = await table.getByProductShadeCode(product_shade_code_id)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

///[DTO] GET BY PRODUCT SHADE CODE
ProductTintersRoute.route(path + '/by-product-shade-code/:product_shade_code_id/dto').get(async (req, res) => {
    try {
        const product_shade_code_id = req.params.product_shade_code_id
        const table = new ProductTintersSchema()
        const result = await table.getByProductShadeCode(product_shade_code_id);
        const result_final = DtoGetProductTinter.parseFromArray(result);

        res.status(200).json(result_final);
    } catch (error) {
        res.status(400).send(error);
    }
});


///CREATE MULTIPLE
ProductTintersRoute.route(path + '/multiple/create').post(async (req, res) => {
    try {
        const datas = req.body as any[];
        const table = new ProductTintersSchema();
        const result: any = await table.createMultiple(datas);
        if (result) res.status(200).json(result);
        else res.status(404).send();
    } catch (error: any) {
        if (error.status && error.status == 409) res.status(409).send();
        res.status(400).send(error);
    }
});

///UPDATE MULTIPLE SMART
ProductTintersRoute.route(path + '/multiple/smart').put(async (req, res) => {
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

        const table = new ProductTintersSchema();

        let resultCreates: any[] = [];
        let resultDeletes: any[] = [];
        let resultUpdates: any[] = [];
        if(_creates.length > 0) resultCreates = await table.createMultiple(_creates);
       if(_deletes.length > 0) resultDeletes = await table.deleteMultiple(_deletes);
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

        res.status(200).send(result);

    } catch (error: any) {
        if (error.status && error.status == 409) res.status(409).send();
        else res.status(400).send(error);
    }
});
