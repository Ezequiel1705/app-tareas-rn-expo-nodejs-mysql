import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "App Todo MySql",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ] 
    },
    apis: ['./docs/**/*.yaml'], // path to the files containing annotations, you can
}

export const swaggerSpecs = swaggerJSDoc(options);
