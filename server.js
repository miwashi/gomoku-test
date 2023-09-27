const { ENV, environments } = require('./config');
const express = require('express');
const cors = require('cors')
var favicon = require('serve-favicon');
var path = require('path');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const app = express();
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(express.static('public'));

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",  // Indicating this is an OpenAPI 3 specification
        info: {
            version: "1.0.0",
            title: "Gomoku API",
            description: "API Information of gomoku-backend",
            contact: {
                name: "Wacoco"
            },
        },
        servers: [
            {
                url: "http://localhost:3001/api/gomoku"
            }
        ]
    },
    apis: ['./routes/*.js']
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/gomoku', require('./routes/game_routes.js'));

if (ENV !== environments.PROD) {
    app.use('*', (req, res) => {
        res.redirect('/api-docs');
    });
}

module.exports = app;