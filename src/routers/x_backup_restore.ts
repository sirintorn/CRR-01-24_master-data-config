import { Router } from "express";
import { CustomProductShadeCodesSchema } from "../models/n_custom_product_shade_codes";
import { CustomProductTinter, CustomProductTintersSchema } from "../models/n_custom_product_tinters";
import { DtoCustomShadeCode } from "../dtos/dto_custom_shade_code";
import { DtoCustomProductTinter } from "../dtos/dto_custom_product_tinters";

export const XBackupRestoreRoutes = Router();

const path = '/backup-restore';

XBackupRestoreRoutes.route(path + '/:target_machine').put(async (req, res) => {
    try {
        const target_machine = req.params.target_machine;
        const backup = req.body;
        
        let customProductShades: DtoCustomShadeCode[] = backup.json_data.custom_product_shades ?? [];
        let customProductTinters: DtoCustomProductTinter[] = backup.json_data.custom_product_tinters ?? [];

        /*
            DELETE related CustomProductShades
            DELETE related CustomProductTinters
            RECOGNIZE CustomProductShades - CustomProductTinters relation
            CREATE CustomProductShades
            MODIFY related CustomProductTinters
            CREATE CustomProductTinters
        */

        
        const customPSCSchema = new CustomProductShadeCodesSchema();
        const customPTSchema = new CustomProductTintersSchema();

        await customPSCSchema.deleteByMachine(target_machine);
        await customPTSchema.deleteByMachine(target_machine);

        let recognizer = [];
        for (let i = 0; i < customProductShades.length; i++) {
            let shade = customProductShades[i];
            //RECOGNITION
            const tinters = customProductTinters.filter(val => val.productShadeCodeId == shade.id);
            recognizer.push({
                tinters: tinters,
                old_id: shade.id,
                new_id: null
            });

            //MODIFICATION
            shade.machineId = target_machine;
        }

        let cProdShades = DtoCustomShadeCode.reverseFromArray(customProductShades, target_machine);
        const ids = await customPSCSchema.batchInsert(cProdShades, true);
        ids.forEach((item, i) => {
            cProdShades[i].id = item.id;
            recognizer[i].new_id = item.id;
        });

        
        let cTinters: CustomProductTinter[] = [];
        for (let i = 0; i < recognizer.length; i++) {
            const item = recognizer[i];
            for (let k = 0; k < item.tinters.length; k++) {
                let tinter = item.tinters[k];
                tinter.productShadeCodeId = item.new_id;
            }
            const tints = DtoCustomProductTinter.reverseFromArray(item.tinters, target_machine);
            cTinters.push(...tints);
        }

        const tids = await customPTSchema.batchInsert(cTinters, true);
        tids.forEach((item, i) => {
            cTinters[i].id = item.id;
        }); 
        
        recognizer.forEach(val => {
            val.tinters = [];
        });

        res.status(200).send({
            customProductShades: cProdShades,
            customProductTinters: cTinters,
            //customProductShades: customProductShades,
            //customProductTinters: customProductTinters,
            recognizer: recognizer
        });

        //res.status(200).send()
    } catch (error) {
        res.status(400).send(error);
    }
});




