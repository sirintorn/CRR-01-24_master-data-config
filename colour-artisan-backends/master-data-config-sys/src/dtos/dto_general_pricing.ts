import { CONFIGS } from "../configs/configs";
import { CanSize } from "../models/m_can_sizes";
import { DBConfig } from "../models/m_db_configs";
import { GeneralPricing } from "../models/m_general_pricings";
import { DTO } from "./dto";

export class DtoGeneralPricing extends DTO{
    id!: any;
    canSizeId!: any;
    displayName!: string;
    price!: number;
    markUpPrice!: number;

    constructor(
        dbConfig: DBConfig,
        generalPricing: GeneralPricing,
        canSize: CanSize
    ){
        super();
        this.id = generalPricing ? generalPricing.id : '';
        this.canSizeId = canSize ? canSize.id : '';
        this.displayName = canSize ? canSize.display_name : '';
        this.price = generalPricing ? generalPricing.price : 0;
        switch(dbConfig.base_price_markup_price_mode){  
            case CONFIGS.dbConfig.basePriceMarkupPriceModes.markup1:
                this.markUpPrice = generalPricing.mark_up_price_01;
                break;
            case CONFIGS.dbConfig.basePriceMarkupPriceModes.markup2:
                this.markUpPrice = generalPricing.mark_up_price_02;
                break;
            case CONFIGS.dbConfig.basePriceMarkupPriceModes.markup3:
                this.markUpPrice = generalPricing.mark_up_price_03;
                break;
            default:
                this.markUpPrice = dbConfig.general_price_markup_price;
        }
    }
}
