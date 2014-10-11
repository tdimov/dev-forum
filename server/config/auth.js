var passport = require('passport');

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

                res.send({success: true, message: "Successful login!", user: user});
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