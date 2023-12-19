"use strict";

const express = require("express");
const app = express();

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0", 
            title: "Documentación API Express",
            description: "API Information",
            contact: {
                name: "Raúl Cedeño, Alvaro Jurado"
            },
            servers: ["http://localhost:3000"]
        }
    },
    basePath: "/",

    apis: ["./api.js", "./api-docs.js"]
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

module.exports = app;