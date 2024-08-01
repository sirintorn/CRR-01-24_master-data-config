export const CONFIGS = {
    swaggerOptions: {
        definition: {
            openapi: "3.1.0",
            info: {
                title: "COLORIANCE: COLOUR ARTISAN APIs with Swagger",
                version: "0.0.1",
                description:
                    "This is a simple CRUD API application made with Express and documented with Swagger",
                /*license: {
                    name: "MIT",
                    url: "https://spdx.org/licenses/MIT.html",
                },
                contact: {
                    name: "LogRocket",
                    url: "https://logrocket.com",
                    email: "info@email.com",
                },*/
            },
            servers: [
                {
                    url: "http://localhost:4000",
                },
            ],
        },
        apis: [
            "./src/routers/*.ts"
        ],
    },
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
        generalPriceMarkupPrice: 0,
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