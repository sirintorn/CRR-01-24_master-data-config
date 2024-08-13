import { Router } from "express";
import multer from "multer";
import { IDGenerator } from "../services/id_generator";
import { TintingProfileSchema } from "../models/c_tinting_profiles";
import { CircuitInfoSchema } from "../models/c_circuit_infos";
import { CalibrationInfoSchema } from "../models/c_calibration_infos";
import { VolumeCalibrationTargetSchema } from "../models/c_volume_calibration_target";
import { StepCalibrationTargetSchema } from "../models/c_step_calibration_target";
import { AccuracyTestTargetSchema } from "../models/c_accuracy_test_targets";
import { MachineSchema } from "../models/b_machines";
import { TPCleanser } from "../services/tp_cleanser";

export const CTintingProfile = Router();

const uploadPath = './uploads/tinting_profiles/';
const path = '/tinting-profile';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = IDGenerator.newTintingProfileFileName();
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});
const upload = multer({ storage: storage }).single('tinting-profile');

CTintingProfile.route(path + '/:machine_id').get(async (req, res) => {
    try {
        const machine_id = req.params.machine_id;

        const circuitInfoSCH = new CircuitInfoSchema();
        const calibrationInfoSCH = new CalibrationInfoSchema();
        const volumeCalibrationTargetSCH = new VolumeCalibrationTargetSchema();
        const stepCalibrationTargetSCH = new StepCalibrationTargetSchema();
        const accuracyTestTargetSCH = new AccuracyTestTargetSchema();

        const circuitInfos = await circuitInfoSCH.getByTintingProfile(machine_id);
        const calibrationInfos = await calibrationInfoSCH.getByTintingProfile(machine_id);
        const volumeCalibrationTargets = await volumeCalibrationTargetSCH.getByTintingProfile(machine_id);
        const stepCalibrationTargets = await stepCalibrationTargetSCH.getByTintingProfile(machine_id);
        const accuracyTestTargets = await accuracyTestTargetSCH.getByTintingProfile(machine_id);

        const result = {
            circuitInfos: circuitInfos,
            calibrationInfos: calibrationInfos,
            volumeCalibrationTargets: volumeCalibrationTargets,
            stepCalibrationTargets: stepCalibrationTargets,
            accuracyTestTargets: accuracyTestTargets
        };
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

CTintingProfile.route(path + '/:machine_id/import').post(async (req, res) => {
    try {
        const machine_id = req.params.machine_id;

        const machineSCH = new MachineSchema();
        const tintingProfileSCH = new TintingProfileSchema();
        const circuitInfoSCH = new CircuitInfoSchema();
        const calibrationInfoSCH = new CalibrationInfoSchema();
        const volumeCalibrationTargetSCH = new VolumeCalibrationTargetSchema();
        const stepCalibrationTargetSCH = new StepCalibrationTargetSchema();
        const accuracyTestTargetSCH = new AccuracyTestTargetSchema();

        await TPCleanser.clearDB(machine_id, tintingProfileSCH, circuitInfoSCH, calibrationInfoSCH, volumeCalibrationTargetSCH, stepCalibrationTargetSCH, accuracyTestTargetSCH);
        //to be continue


    } catch (error) {
        res.status(400).send(error);
    }
});

CTintingProfile.route(path + '/circuit-info/multiple').post(async (req, res) => {
    try {
        const circuitInfoSCH = new CircuitInfoSchema();
        const body = req.body;
        const ids = await circuitInfoSCH.createMultiple(body, true);

        res.status(200).send(ids);
    } catch (error) {
        res.status(400).send(error);
    }
});

CTintingProfile.route(path + '/calibration-info/multiple').post(async (req, res) => {
    try {
        const calibrationInfoSCH = new CalibrationInfoSchema();
        const body = req.body;
        const ids = await calibrationInfoSCH.createMultiple(body, true);

        res.status(200).send(ids);
    } catch (error) {
        res.status(400).send(error);
    }
});

CTintingProfile.route(path + '/volume-calibration-target/multiple').post(async (req, res) => {
    try {
        const volumeCalibrationTargetSCH = new VolumeCalibrationTargetSchema();
        const body = req.body;
        const ids = await volumeCalibrationTargetSCH.createMultiple(body, true);

        res.status(200).send(ids);
    } catch (error) {
        res.status(400).send(error);
    }
});

CTintingProfile.route(path + '/step-calibration-target/multiple').post(async (req, res) => {
    try {
        const stepCalibrationTargetSCH = new StepCalibrationTargetSchema();
        const body = req.body;
        const ids = await stepCalibrationTargetSCH.createMultiple(body, true);

        res.status(200).send(ids);
    } catch (error) {
        res.status(400).send(error);
    }
});

CTintingProfile.route(path + '/accuracy-test-target/multiple').post(async (req, res) => {
    try {
        const accuracyTestTargetSCH = new AccuracyTestTargetSchema();
        const body = req.body;
        const ids = await accuracyTestTargetSCH.createMultiple(body, true);

        res.status(200).send(ids);
    } catch (error) {
        res.status(400).send(error);
    }
});