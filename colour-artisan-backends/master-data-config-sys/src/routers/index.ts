import { Router } from "express";
import { DBVersionsRoute } from "./R_DBVersion";

export const routes = Router();

routes.use(DBVersionsRoute);