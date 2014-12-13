var mongoose = require('mongoose'),
    user = require('../models/user'),
    question = require('../models/question'),
    tag = require('../models/tag'),
    answer = require('../models/answer'),
    vote = require('../models/vote'),
    comment = require('../models/comment');

module.exports = function (config){
    mongoose.connect(config.db);

    var db = mongoose.connection;
    db.once('open', function (err) {
        if(err) {
            console.log('Database could not be opened: ' + err);
            return;
        }

        console.log('Database up and running...');
    });

    db.on('error', function (err) {
        console.log(err);
    });

    user.seedInitialUsers();
};