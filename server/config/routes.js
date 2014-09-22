var passport = require('passport');
var auth = require('./auth');
var mongoose = require('mongoose');

var User = mongoose.model('User');

module.exports = function (app) {
    app.get('/partials/:partialArea/:partialName', function(req, res) {
        res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName);
    });

    app.get('/api/users',auth.isInRole('admin'), function (req, res) {
        User.find({}).exec(function(err, collection) {
            if(err) {
                console.log('Users could not be loaded: ' + err);
            }

            res.send(collection);
        })
    });

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.get('*', function (req, res){
        res.render('index', {currentUser: req.user});
    });
};