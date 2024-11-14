import { Router } from "express";

export const XBackupRestoreRoutes = Router();

const path = '/backup-restore';

XBackupRestoreRoutes.route(path + '/:target_machine').put(async (req, res) => {
    try {
        const target_machine = req.params.target_machine;
        const backupData = req.body;
    } catch (error) {
        res.status(400).send(error);
    }
});