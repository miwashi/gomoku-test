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
        info: {
            version: "1.0.0",
            title: "Gomoku API",
            description: "API Information of gomoku-backend",
            contact: {
                name: "Wacoco"
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/game', require('./routes/game_routes.js'));

module.exports = app;