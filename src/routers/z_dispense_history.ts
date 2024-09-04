import { Router } from "express";
import { DispenseHistorySchema } from "../models/z_dispense_history";
import { DispenseHistoryTinter, DispenseHistoryTinterSchema } from "../models/z_dispense_history_tinters";

export const ZDispenseHistory = Router();

const path = '/dispense-history';

ZDispenseHistory.route(path).post(async (req, res) => {
    try {
        const data = req.body;
        const tinters = data.tinters;
        delete data.tinters;

        const historySCH = new DispenseHistorySchema();
        const tinterSCH = new DispenseHistoryTinterSchema();

        const result1 = await historySCH.create(data, true);
        const dispense_history_id = result1[0].id;

        let result2 = null;
        if(tinters){
            for (let i = 0; i < tinters.length; i++) {
                let item = tinters[i];
                item.dispense_history_id = dispense_history_id;
                item.machine_id = data.machine_id;
                item.company_id = data.company_id;
            }
    
            result2 = await tinterSCH.createMultiple(tinters, true);
        }

        const result = {
            dispense_history: result1,
            dispense_history_tinters: result2
        };

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

ZDispenseHistory.route(path + '/by-machine/:machine_id').get(async (req, res) => {
    try {
        const machine_id = req.params.machine_id;

        const historySCH = new DispenseHistorySchema();
        const tinterSCH = new DispenseHistoryTinterSchema();

        const hists = await historySCH.getByMachine(machine_id);

        for (let i = 0; i < hists.length; i++) {
            let item = hists[i] as any;
            const tints = await tinterSCH.getByDispenseHistory(item.id);
            item._data = {
                tinters: tints
            }
        }

        res.status(200).send(hists);
    } catch (error) {
        res.status(400).send(error);

    }
});