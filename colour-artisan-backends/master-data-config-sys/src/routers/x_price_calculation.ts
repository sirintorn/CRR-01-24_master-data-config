import { Router } from "express";
import { DtoGetShadeCode } from "../dtos/dto_get_shade_code";

const PriceCalculationRouter = Router();

const path = "/price-cal";

PriceCalculationRouter.route(path + "/tot-general").post(async (req, res) => {
    try {
        let body = req.body;

    } catch (error) {
        res.status(400).send(error);
    }
});