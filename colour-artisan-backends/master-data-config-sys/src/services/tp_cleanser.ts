import { AccuracyTestTargetSchema } from "../models/c_accuracy_test_targets";
import { CalibrationInfoSchema } from "../models/c_calibration_infos";
import { CircuitInfoSchema } from "../models/c_circuit_infos";
import { StepCalibrationTargetSchema } from "../models/c_step_calibration_target";
import { TintingProfileSchema } from "../models/c_tinting_profiles";
import { VolumeCalibrationTargetSchema } from "../models/c_volume_calibration_target";

export class TPCleanser{
    static async clearDB(tinting_profile_id: any,
        tintingProfileSCH: TintingProfileSchema,
        circuitInfoSCH: CircuitInfoSchema,
        calibrationInfoSCH: CalibrationInfoSchema,
        volumeCalibrationTargetSCH: VolumeCalibrationTargetSchema,
        stepCalibrationTargetSCH: StepCalibrationTargetSchema,
        accuracyTestTargetSCH: AccuracyTestTargetSchema,
    ) {
        await tintingProfileSCH.forceDelete(tinting_profile_id);
        await circuitInfoSCH.forceDeleteByTintingProfile(tinting_profile_id);
        await calibrationInfoSCH.forceDeleteByTintingProfile(tinting_profile_id);
        await volumeCalibrationTargetSCH.forceDeleteByTintingProfile(tinting_profile_id);
        await stepCalibrationTargetSCH.forceDeleteByTintingProfile(tinting_profile_id);
        await accuracyTestTargetSCH.forceDeleteByTintingProfile(tinting_profile_id);
    }
}