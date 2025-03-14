/**
 * @swagger
 * components:
 *   schemas:
 *     POSTResponse:
 *       type: array
 *       items:
 *           type: object
 *           properties:
 *               id:
 *                   type: integer
 *                   description: The auto-generated id of a record
 *    
 */

import { Router } from "express";
import { DBVersionsRoute } from "./r_db_versions";
import { CanUnitsRoute } from "./r_can_units";
import { CanSizesRoute } from "./r_can_sizes";
import { GeneralPricingRoute } from "./r_general_pricings";
import { ProductBasePricingsRoute } from "./r_product_base_pricings";
import { ProductBasesRoute } from "./r_product_bases";
import { ProductCanSizesRoute } from "./r_product_can_sizes";
import { ProductGroupsRoute } from "./r_product_groups";
import { ProductShadeCodesRoute } from "./r_product_shade_codes";
import { ProductTintersRoute } from "./r_product_tinters";
import { ProductsRoute } from "./r_products";
import { SubProductsRoute } from "./r_sub_products";
import { TinterPricingsRoute } from "./r_tinter_pricings";
import { XUnitOfMeasurementRoute } from "./x_unit_of_measurement";
import { XTempTest } from "./x_temp_test";
import { DBConfigsRoute } from "./r_db_configs";
import { XProductGroupRoute } from "./x_product_group";
import { XProductRoute } from "./x_product";
import { AppRoute } from "./r_app";
import { XImportExport } from "./x_import_export";
import { ZDispenseHistory } from "./z_dispense_history";
import { CTintingProfile } from "./c_tinting_profile";
import { CMachine } from "./c_machine";
import { CustomProductShadeCodesRoute } from "./r_custom_product_shade_codes";
import { CustomProductTintersRoute } from "./r_custom_product_tinters";
import { XBackupRestoreRoutes } from "./x_backup_restore";

export const routes = Router();

//1
routes.use(CanSizesRoute);
//2
routes.use(CanUnitsRoute);
//3
routes.use(DBVersionsRoute);
//4
routes.use(GeneralPricingRoute);
//5
routes.use(ProductBasePricingsRoute);
//6
routes.use(ProductBasesRoute);
//7
routes.use(ProductCanSizesRoute);
//8
routes.use(ProductGroupsRoute);
//9
routes.use(ProductShadeCodesRoute);
//10
routes.use(ProductTintersRoute);
//11
routes.use(ProductsRoute);
//12
routes.use(SubProductsRoute);
//13
routes.use(TinterPricingsRoute);
//14
routes.use(XUnitOfMeasurementRoute);
//15
routes.use(DBConfigsRoute);
//16
routes.use(XProductGroupRoute);
//17
routes.use(XProductRoute);

//18
routes.use(AppRoute);

//19
routes.use(XImportExport);

//20
routes.use(CTintingProfile);

//21
routes.use(CMachine);

//22
routes.use(CustomProductShadeCodesRoute);

//23
routes.use(CustomProductTintersRoute);

//special
routes.use(XTempTest);

//special 24
routes.use(XBackupRestoreRoutes);


//SHOULD BE ANOTHER MICRO SERVICE
routes.use(ZDispenseHistory);
