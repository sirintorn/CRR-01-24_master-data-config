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
    }
};