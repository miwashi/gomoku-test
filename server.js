const express = require('express');
var favicon = require('serve-favicon');
var path = require('path');

const app = express();
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static('public'));


app.use('/api/game', require('./routes/game_routes.js'));

module.exports = app;