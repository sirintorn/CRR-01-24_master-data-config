import { CONFIGS } from "../../configs/configs";
import { DtoGeneralPricing } from "../../dtos/dto_general_pricing";
import { DtoGetShadeCode } from "../../dtos/dto_get_shade_code";
import { DtoTinterPricing } from "../../dtos/dto_tinter_pricing";
import { DBConfig } from "../../models/m_db_configs";
import { ProductCanSize } from "../../models/m_product_can_sizes";
import { ProductTinter } from "../../models/m_product_tinters";

export class PriceCalculation {

    //[Formula Book, Custom Formula]
    //Product Base Pricing:  ราคา price ตาม Product Can Size และ Base ต่างๆ บวกด้วยกำไรจาก Markup + ราคา tinters ที่ใช้; ......TOTAL (TOT) สูตรคือ ---->( price + ( price * ( markup / 100 ) ) ) + ( ( unit_price / 1000 ) * amount ) + Σ( ( ( unit_price ) / 1000 ) * amount ) * ( markup / 100 ) );
    
    
    
    //General Pricing: ราคา price ตาม Can Size ต่างๆ บวกด้วยกำไรจาก Markup; 
    ///....TOTAL (TOT) สูตรคือ ---> ( price + ( price * ( markup / 100 ) ) ) + Σ( ( unit_price / 1000 ) * amount ) + ( ( ( unit_price ) / 1000 ) * amount ) * ( markup / 100 ) );
    static receiptNetTOT_General(
        shade: DtoGetShadeCode,
        tinters: ProductTinter[], 
        targetCanSize: ProductCanSize, 
        generalPricings: DtoGeneralPricing[],
        tinterPricings: DtoTinterPricing[],
        dbConfig: DBConfig
    ){
        let receipt = {
            shadeCode: shade.shadeCode,
            tinter: 0,
            base: 0,
            subTotal: 0,
            discount: 0,
            vat: 0,
            total: 0
        };

        //คำนวนราคาจากปริมาณสีที่มีการใช้ทั้งหมด
        receipt.tinter 
            = this.calAllTinters(tinters, tinterPricings);
        
        //หาก DBConfig ไม่ได้ตั้งค่าแบบ no-pricing ให้คำนวนราคาจาก ProductCanSize
        receipt.base 
            = (dbConfig.base_price_lookup_mode != CONFIGS.dbConfig.basePriceLookupModes.noPricing) ? this.calProductCanSize(targetCanSize, generalPricings) : 0;
        
        //ราคารวม
        receipt.subTotal 
            = this.calTOT_General(receipt.base, receipt.tinter);
        
        //ส่วนลด หากมี
        receipt.discount 
            = dbConfig.discount_visible ? this.calDiscount(receipt.subTotal, dbConfig.discount) : 0;

        //VAT หากมี
        receipt.vat 
            = dbConfig.vat_visible ? this.calVat(receipt.subTotal, dbConfig.vat) : 0;

        //ราคาสุทธิ
        receipt.total 
            = this.calNetTOT(receipt.subTotal, receipt.vat, receipt.discount);

        return receipt;
    }


    static calTOT_General(
        canSizePrice: number,
        tinterPrice: number
    ){
        return canSizePrice + tinterPrice;
    }

    static calTOT_Manual(productTinters: ProductTinter[], tinterPricings: DtoTinterPricing[]){
        return this.calAllTinters(productTinters, tinterPricings);
    }

    static calProductCanSize(targetCanSize: ProductCanSize, generalPricings: DtoGeneralPricing[]){
        const pricing = generalPricings.find((value) => value.canSizeId == targetCanSize.can_size_id);
        let p = 0;
        p = pricing?.price! + (pricing?.price! * (pricing?.markUpPrice! / 100));
        return p;
    } 

    //[Manual Dispense]
    //Tinter Pricing: ราคา tinters ที่ใช้; 
    ///......TOTAL (TOT) สูตรคือ ----> Σ( unit_price / 1000 ) * amount ) + Σ( ( ( unit_price ) / 1000 ) * amount ) * ( markup / 100 ) );
    static calAllTinters(productTinters: ProductTinter[], tinterPricings: DtoTinterPricing[]){
        let total = 0;
        for (let i = 0; i < productTinters.length; i++) {
            const targetTinter = productTinters[i];
            total += this.calSingleTinter(targetTinter, tinterPricings);
        }
        return total;
    }
    static calSingleTinter(targetTinter: ProductTinter, tinterPricings: DtoTinterPricing[]){
        const pricing = tinterPricings.find((value) => value.tinterCode == targetTinter.tinter_code);
        let p = 0;
        let base = (pricing?.price! / 1000) * targetTinter.amount;
        let markup = base * (pricing?.markUpPrice! / 100)
        p = base + markup;
        return p;
    }

    //TOT + VAT สูตรคือ ---> TOT - ( TOT * ( Discount / 100 ) ) + (TOT * ( VAT / 100 ) )
    static calNetTOT(tot: number, vat: number, discount: number){
        return tot - this.calDiscount(tot, discount) + this.calVat(tot, vat);
    }
    static calVat(tot: number, vat: number) {
        return tot * (vat / 100);
    }
    static calDiscount(tot: number, discount: number) {
        return tot * (discount / 100);
    }
}