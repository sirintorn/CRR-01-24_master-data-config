import { CONFIGS } from "../configs/configs";
import { DBConfig } from "../models/m_db_configs";
import { TinterPricing } from "../models/m_tinter_pricings";
import { DTO } from "./dto";

export class DtoTinterPricing extends DTO{
    id!: any;
    tinterCode!: string;
    tinterName!: string;
    sg!: number;
    red!: number;
    green!: number;
    blue!: number;
    price!: number;
    markUpPrice!: number;

    constructor(
        dbConfig: DBConfig,
        tinterPricing: TinterPricing
    ){
        super();
        this.id = tinterPricing ? tinterPricing.id : '';
        this.tinterCode = tinterPricing ? tinterPricing.tinter_code : '';
        this.tinterName = tinterPricing ? tinterPricing.tinter_name : '';
        this.sg = tinterPricing ? tinterPricing.sg : 0;
        this.red = tinterPricing ? tinterPricing.red : 0;
        this.green = tinterPricing ? tinterPricing.green : 0;
        this.blue = tinterPricing ? tinterPricing.blue : 0;
        this.price = tinterPricing ? tinterPricing.price : 0;
        switch(dbConfig.tinter_price_markup_price_mode){
            case CONFIGS.dbConfig.tinterPriceMarkupPriceModes.markup1:
                this.markUpPrice = tinterPricing.mark_up_price_01;
                break;
            case CONFIGS.dbConfig.tinterPriceMarkupPriceModes.markup2:
                this.markUpPrice = tinterPricing.mark_up_price_02;
                break;
            case CONFIGS.dbConfig.tinterPriceMarkupPriceModes.markup3:
                this.markUpPrice = tinterPricing.mark_up_price_03;
                break;
            default:
                this.markUpPrice = dbConfig.tinter_price_markup_price;
        }
    }
}