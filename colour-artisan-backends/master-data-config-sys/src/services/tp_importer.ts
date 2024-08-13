import { CircuitInfoSchema } from "../models/c_circuit_infos";
import { Workbook } from "exceljs";

export class TPImporter{

    static async compute_sheet1(workbook: Workbook, tinting_profile_id: any,
        circuitInfoSCH: CircuitInfoSchema
    ){
        try {
            let data = null;

            const sheet = workbook.getWorksheet('CircuitInfo');

            

            return data;
        } catch (error) {
            return error;
        }
    }

    static async compute_sheet2(workbook: Workbook, tinting_profile_id: any,

    ){
        
    }

    static async compute_sheet3(workbook: Workbook, tinting_profile_id: any,

    ){
        
    }

    static async compute_sheet4(workbook: Workbook, tinting_profile_id: any,

    ){
        
    }

    static async compute_sheet5(workbook: Workbook, tinting_profile_id: any,

    ){
        
    }
}