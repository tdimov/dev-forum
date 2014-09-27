var User = require('mongoose').model('User'),
    encryption = require('../utilities/encryption'),
    validation = require('../utilities/validation');

module.exports = {
    getAllUsers: function (req, res) {
        User.find({}).exec(function(err, collection) {
            if(err) {
                console.log('Users could not be loaded: ' + err);
            }

            res.send(collection);
        })
    },
    register: function (req, res, next) {
        var newUserData = req.body;

        if(validation.isRegistrationValid(newUserData)) {
            newUserData.salt = encryption.generateSalt();
            newUserData.passHash = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            User.create(newUserData, function (err, user){
                if(err){
                    console.log('Failed to register new user: ' + err);
                    return;
                }
                req.logIn(user, function (err) {
                    if(err) {
                        res.status(400);
                        return res.send({reason: err.toString()});
                    }

                    res.send({success: true, user: user});
                });
            });
        }
        else {
            res.send({success: false})
        }

    }
};