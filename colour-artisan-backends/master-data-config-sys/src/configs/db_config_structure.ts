export interface DBConfig {
    id: any,
    db_version_id: any,
    can_size_lookup_mode: any,
    can_size_lookup_key: any,
    discount: number,
    discount_visible: boolean,
    vat: number,
    vat_visible: boolean,
    total_price_rounding: number,
    total_price_visible: boolean,
    tinter_price_markup_price: number,
    tinter_price_markup_price_mode: any,
    tinter_price_visible: boolean,
    base_price_lookup_mode: any,
    base_price_markup_price: number,
    base_price_markup_price_mode: any,
    base_price_visible: boolean,
    display_unit: string,
    custom_ml_oz_unit: number,
    created_by?: any,
    updated_by?: any,
    created_at?: any,
    updated_at?: any,
    deleted_by?: any,
    deleted_at?: any,
}

export const CONFIGS_COPY = {
    dbConfig: {
        canSizeLookupModes: {
            all: 'all',
            productCanSize: 'product_can_size',
            productBasePricing: 'product_base_pricing',
        },
        canSizeLookupKey: {
            product: 'product',
            subProduct: 'sub_product'
        },
        discountVisible: true,
        discount: 0,
        vatVisible: true,
        vat: 0,
        totalPriceRounding: 2,
        totalPriceVisible: true,
        tinterPriceVisible: true,
        basePriceLookupModes: {
            productBasePricing: 'product_base',
            generalPricing: 'general',
            noPricing: 'no_pricing'
        },
        tinterPriceMarkupPriceModes: {
            default: 'default',
            markup1: 'markup1',
            markup2: 'markup2',
            markup3: 'markup3'
        },
        tinterPriceMarkupPrice: 0,
        basePriceMarkupPriceModes: {
            default: 'default',
            markup1: 'markup1',
            markup2: 'markup2',
            markup3: 'markup3'
        },
        basePriceMarkupPrice: 0,
        basePriceVisible: true,
        displayUnits: {
            ml: 'ml',
            g: 'g',
            oz: 'oz'
        },
        customMlOzUnit: 28.41306 //UK oz
    }
};