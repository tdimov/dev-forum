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

                    res.send({success: true, message: "Registration successful!", user: user});
                });
            });
        }
        else {
            res.send({success: false, message: "Please, enter correct user data!"});
        }

    },
    updateUser: function (req, res, next) {
        var updatedUser = req.body;
        if(req.user._id == updatedUser._id) {
            if(validation.isUpdateUserDataValid(updatedUser)) {
                if(updatedUser.newPassword && updatedUser.newPassword.length > 0) {
                    updatedUser.salt = encryption.generateSalt();
                    updatedUser.passHash = encryption.generateHashedPassword(updatedUser.salt, updatedUser.newPassword);
                }

                User.update({_id: updatedUser._id}, updatedUser, function(err) {
                    if(err) {
                        res.send({success: false, message: "Update profile failed!"});
                        red.end();
                    }
                    else {
                        res.send({success: true, message: "Successful update!"});
                        res.end();
                    }

                });
            }
            else {
                res.send({success: false, message: "Please, enter correct user data!"})
            }

        }
        else {
            res.send({success: false, message: "Update profile failed!" });
            res.end();
        }
    }
};