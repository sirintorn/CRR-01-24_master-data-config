import { ProductShadeCodesSchema } from "../models/m_product_shade_codes";
import { TinterPricingsSchema } from "../models/m_tinter_pricings";
import { ProductTintersSchema } from "../models/m_product_tinters";
import { ProductGroupsSchema } from "../models/m_product_groups";
import { ProductsSchema } from "../models/m_products";
import { SubProductsSchema } from "../models/m_sub_products";
import { ProductBasesSchema } from "../models/m_product_bases";
import { CanSizesSchema } from "../models/m_can_sizes";
import { DBConfigsSchema } from "../models/m_db_configs";
import { CanUnitsSchema } from "../models/m_can_units";
import { ProductCanSizesSchema } from "../models/m_product_can_sizes";
import { ProductBasePricingsSchema } from "../models/m_product_base_pricings";
import { GeneralPricingsSchema } from "../models/m_general_pricings";

export class DBCleanser{
    static async clearDB(db_version_id: any,
        dbConfigSCH: DBConfigsSchema,
        canSizesSCH: CanSizesSchema,
        canUnitsSCH: CanUnitsSchema,
        generalPSCH: GeneralPricingsSchema,
        productBasePSCH: ProductBasePricingsSchema,
        basesSCH: ProductBasesSchema,
        prodCanSizesSCH: ProductCanSizesSchema,
        groupsSCH: ProductGroupsSchema,
        shadesSCH: ProductShadeCodesSchema,
        prodTinterSCH: ProductTintersSchema,
        productsSCH: ProductsSchema,
        subProdSCH: SubProductsSchema,
        tinterPSCH: TinterPricingsSchema
    ) {
        await dbConfigSCH.update(db_version_id, dbConfigSCH.generateDefaultConfig(db_version_id));
    
        await canSizesSCH.forceDeleteByDBVersion(db_version_id);
        await canUnitsSCH.forceDeleteByDBVersion(db_version_id);
        await generalPSCH.forceDeleteByDBVersion(db_version_id);
        await productBasePSCH.forceDeleteByDBVersion(db_version_id);
        await basesSCH.forceDeleteByDBVersion(db_version_id);
        await prodCanSizesSCH.forceDeleteByDBVersion(db_version_id);
        await groupsSCH.forceDeleteByDBVersion(db_version_id);
        await shadesSCH.forceDeleteByDBVersion(db_version_id);
        await prodTinterSCH.forceDeleteByDBVersion(db_version_id);
        await productsSCH.forceDeleteByDBVersion(db_version_id);
        await subProdSCH.forceDeleteByDBVersion(db_version_id);
        await tinterPSCH.forceDeleteByDBVersion(db_version_id);
    }
}