const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const multer = require('multer');

module.exports = (app, config) => {
  app.set('view engine', 'jade'); // set view engine to express
  app.set('views', `${config.rootPath}/server/views`); // set folder where the views are
  app.use(express.static(`${config.rootPath}/public`)); // set path to static files
  app.use(cookieParser());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());
  app.use(
    multer({
      dest: './uploads/',
      limits: {
        fieldNameSize: 100 * 24 * 21,
        files: 1
      }
    })
  );
  app.use(
    session({
      secret: 'samsung galaxy alpha',
      proxy: true,
      resave: true,
      saveUninitialized: true
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};
