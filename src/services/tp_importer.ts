import { CircuitInfo, CircuitInfoSchema } from "../models/c_circuit_infos";
import { CalibrationInfo, CalibrationInfoSchema } from "../models/c_calibration_infos";
import { VolumeCalibrationTarget, VolumeCalibrationTargetSchema } from "../models/c_volume_calibration_target";
import { StepCalibrationTarget, StepCalibrationTargetSchema } from "../models/c_step_calibration_target";
import { AccuracyTestTarget, AccuracyTestTargetSchema } from "../models/c_accuracy_test_targets";
import { Workbook } from "exceljs";

export class TPImporter {

    static async compute_sheet1(workbook: Workbook, tinting_profile_id: any,
        circuitInfoSCH: CircuitInfoSchema
    ): Promise<any> {
        try {
            const sheet = workbook.getWorksheet('CircuitInfo');

            let rows: CircuitInfo[] = [];
            sheet?.eachRow((row, rowNum) => {
                if (rowNum != 1) {
                    const data: CircuitInfo = {
                        id: null,
                        tinting_profile_id: tinting_profile_id,
                        enabled: row.getCell(1).value ? this.stringToBool(row.getCell(1).value?.toString()!) : false,
                        index: row.getCell(2).value ? Number(row.getCell(2).value?.toString()!) : 0,
                        tinter_code: row.getCell(3).value ? row.getCell(3).value?.toString()! : '-',
                        tinter_name: row.getCell(4).value ? row.getCell(4).value?.toString()! : '-',
                        r: row.getCell(5).value ? this.getColorCode('r', row.getCell(5).value?.toString()!) : 0,
                        g: row.getCell(5).value ? this.getColorCode('g', row.getCell(5).value?.toString()!) : 0,
                        b: row.getCell(5).value ? this.getColorCode('b', row.getCell(5).value?.toString()!) : 0,
                        sg: row.getCell(6).value ? Number(row.getCell(6).value?.toString()) : 0,
                        max_level: row.getCell(7).value ? Number(row.getCell(7).value?.toString()) : 0,
                        refill_level: row.getCell(8).value ? Number(row.getCell(8).value?.toString()) : 0,
                        cutoff_level: row.getCell(9).value ? Number(row.getCell(9).value?.toString()) : 0,
                        current_level: row.getCell(10).value ? Number(row.getCell(10).value?.toString()) : 0,
                    };
                    rows.push(data);
                }
            });

            const ids = await circuitInfoSCH.createMultiple(rows, true);

            return ids;
        } catch (error) {
            return error;
        }
    }

    static getColorCode(code: string, value: string) {
        let rgb: string[] = value.split(',');
        switch (code) {
            case 'r':
                return Number(rgb[0]);
            case 'g':
                return Number(rgb[1]);
            case 'b':
                return Number(rgb[2]);
            default:
                return 0
        }
    }

    static stringToBool(str: string) {
        let x = str.toLowerCase();
        return x == 'true';
    }

    static async compute_sheet2(
        workbook: Workbook,
        tinting_profile_id: any,
        calibrationInfoSCH: CalibrationInfoSchema
    ): Promise<any> {
        try {
            const sheet = workbook.getWorksheet('CalibrationInfo');

            let rows: CalibrationInfo[] = [];
            sheet?.eachRow((row, rowNum) => {
                if (rowNum != 1) {
                    const data: CalibrationInfo = {
                        id: null,
                        tinting_profile_id: tinting_profile_id,
                        index: row.getCell(1).value ? Number(row.getCell(1).value?.toString()!) : 0,
                        tinter_code: row.getCell(2).value ? row.getCell(2).value?.toString()! : '-',
                        tinter_name: row.getCell(3).value ? row.getCell(3).value?.toString()! : '-',
                        target_ml: row.getCell(4).value ? Number(row.getCell(4).value?.toString()!) : 0,
                        target_err_rate: row.getCell(5).value ? Number(row.getCell(5).value?.toString()!) : 0,
                        repeat: row.getCell(6).value ? Number(row.getCell(6).value?.toString()!) : 0,
                        result_step: row.getCell(7).value ? Number(row.getCell(7).value?.toString()!) : 0,
                        result_ml: row.getCell(8).value ? Number(row.getCell(8).value?.toString()!) : 0,
                        result_g: row.getCell(9).value ? Number(row.getCell(9).value?.toString()!) : 0,
                        result_err_rate: row.getCell(10).value ? Number(row.getCell(10).value?.toString()!) : 0,
                        status: row.getCell(11).value ? row.getCell(11).value?.toString()! : '-',
                        created: row.getCell(12).value ? Number(row.getCell(12).value?.toString()!) : 0,
                        modified: row.getCell(13).value ? Number(row.getCell(13).value?.toString()!) : 0,
                    };
                    rows.push(data);
                }
            });

            const ids = await calibrationInfoSCH.createMultiple(rows, true);

            return ids;
        } catch (error) {
            return error;
        }
    }

    static async compute_sheet3(
        workbook: Workbook,
        tinting_profile_id: any,
        volumeCalibrationTargetSCH: VolumeCalibrationTargetSchema
    ): Promise<any> {
        try {
            const sheet = workbook.getWorksheet('VolumeCalibrationTarget');

            let rows: VolumeCalibrationTarget[] = [];
            sheet?.eachRow((row, rowNum) => {
                if (rowNum != 1) {
                    const data: VolumeCalibrationTarget = {
                        id: null,
                        tinting_profile_id: tinting_profile_id,
                        target_ml: row.getCell(1).value ? Number(row.getCell(1).value?.toString()!) : 0,
                        target_err_rate: row.getCell(2).value ? Number(row.getCell(2).value?.toString()!) : 0,
                        repeat: row.getCell(3).value ? Number(row.getCell(3).value?.toString()!) : 0,
                    };
                    rows.push(data);
                }
            });

            const ids = await volumeCalibrationTargetSCH.createMultiple(rows, true);

            return ids;
        } catch (error) {
            return error;
        }
    }

    static async compute_sheet4(
        workbook: Workbook,
        tinting_profile_id: any,
        stepCalibrationTargetSCH: StepCalibrationTargetSchema
    ): Promise<any> {
        try {
            const sheet = workbook.getWorksheet('StepCalibrationTarget');

            let rows: StepCalibrationTarget[] = [];
            sheet?.eachRow((row, rowNum) => {
                if (rowNum != 1) {
                    const data: StepCalibrationTarget = {
                        id: null,
                        tinting_profile_id: tinting_profile_id,
                        target_step: row.getCell(1).value ? Number(row.getCell(1).value?.toString()!) : 0,
                        target_err_rate: row.getCell(2).value ? Number(row.getCell(2).value?.toString()!) : 0,
                        repeat: row.getCell(3).value ? Number(row.getCell(3).value?.toString()!) : 0,
                    };
                    rows.push(data);
                }
            });

            const ids = await stepCalibrationTargetSCH.createMultiple(rows, true);

            return ids;
        } catch (error) {
            return error;
        }
    }

    static async compute_sheet5(
        workbook: Workbook,
        tinting_profile_id: any,
        accuracyTestTargetSCH: AccuracyTestTargetSchema
    ): Promise<any> {
        try {
            const sheet = workbook.getWorksheet('AccuracyTestTarget');

            let rows: AccuracyTestTarget[] = [];
            sheet?.eachRow((row, rowNum) => {
                if (rowNum != 1) {
                    const data: AccuracyTestTarget = {
                        id: null,
                        tinting_profile_id: tinting_profile_id,
                        target_ml: row.getCell(1).value ? Number(row.getCell(1).value?.toString()!) : 0,
                        repeat: row.getCell(2).value ? Number(row.getCell(2).value?.toString()!) : 0,
                    };
                    rows.push(data);
                }
            });

            const ids = await accuracyTestTargetSCH.createMultiple(rows, true);

            return ids;
        } catch (error) {
            return error;
        }
    }
}