import { Router } from "express";
import { MachineSchema } from "../models/b_machines";

export const CMachine = Router();

const path = '/machine';

CMachine.route(path + '/by-company/:company_id').get(async (req, res) => {
    try {
        const company_id = req.params.company_id;

        const machineSCH = new MachineSchema();
        const machine = await machineSCH.getByCompany(company_id);

        res.status(200).send(machine);
    } catch (error) {
        res.status(400).send(error);
    }
});