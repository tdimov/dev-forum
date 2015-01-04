var passport = require('passport'),
    User = require('mongoose').model('User');

module.exports = {
    login: function (req, res, next) {
        var auth = passport.authenticate('local', function (err, user) {
            if(err) {
                return next(err);
            }

            if(!user) {
                res.send({success: false, message: "Wrong username or password!"});
            }

            req.logIn(user, function (err) {

                if(err) {
                    return next(err);
                }

                user.lastLoginDate = new Date();

                User.update({_id: user._id}, {$set: {lastLoginDate: new Date()}}, {upsert: true}, function (err) {
                    if(err) {
                        console.log('Set last login date failed: ' + err);
                        return;
                    }

                    res.send({success: true, message: "Successful login!", user: user});
                });

            });
        });
        auth(req, res, next);
    },
    logout: function (req, res, next) {
        req.logout();
        res.send({success: true, message: 'Successful logout!'});
        res.end();
    },
    isAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        }
        else {
            res.status(403);
            res.write("Unauthorized request.");
            res.end()
        }
    },
    isInRole: function (role) {
        return function (req, res, next) {
            if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
                next();
            }
            else {
                res.status(403);
                res.write("Unauthorized request.");
                res.end()
            }
        }

    }
};