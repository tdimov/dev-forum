var express = require('express'),
    bodyParser = require('body-parser');

module.exports = function (app, config) {
    app.set('view engine', 'jade'); // set view engine to express
    app.set('views', config.rootPath + '/server/views'); // set folder where are views
    app.use(express.static(config.rootPath + '/public')); // set path to static files
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
};