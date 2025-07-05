//RecursosBackend-Adoptme-main\RecursosBackend-Adoptme-main\src\config\swagger.js
import swaggerJSDoc from "swagger-jsdoc";
import __dirname from "../utils/index.js";

const swaggerOptions = {
    definition:{
        openapi: '3.0.1',
        info:{
            title: 'Adoptme API',
            version: '1.0.0',
            description: 'Documentación de la API adoptme: sessions, pets y adoptions.',
        },
    },
    apis:[`${__dirname}/../docs/**/*.yaml`],
}

export const swaggerSpecs = swaggerJSDoc(swaggerOptions);