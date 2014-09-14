var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function (app, config) {
    app.set('view engine', 'jade'); // set view engine to express
    app.set('views', config.rootPath + '/server/views'); // set folder where are views
    app.use(express.static(config.rootPath + '/public')); // set path to static files
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(session());
    app.use(passport.initialize());
    app.use(passport.session());
};