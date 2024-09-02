import { Router } from "express";
import { MachineSchema } from "../models/b_machines";
import { DtoGetMachine } from "../dtos/dto_get_machine";

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

CMachine.route(path + '/by-company/:company_id/dto').get(async (req, res) => {
    try {
        const company_id = req.params.company_id;

        const machineSCH = new MachineSchema();
        const machines = await machineSCH.getByCompany(company_id);
        const dtos = DtoGetMachine.parseFromArray(machines);

        res.status(200).send(dtos);
    } catch (error) {
        res.status(400).send(error);
    }
});