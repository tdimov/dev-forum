var User = require('mongoose').model('User'),
    encryption = require('../utilities/encryption'),
    usersValidator = require('../utilities/validation/usersValidator');

function updateCurrentUser(req, res, updatedUser) {

}

function updateUserByAdmin(req, res, updatedUser) {

}

module.exports = {
    getAllUsers: function (req, res) {
        User.find({_id: { '$ne': req.user._id }}).exec(function(err, collection) {
            if(err) {
                console.log('Users could not be loaded: ' + err);
                return;
            }

            res.send(collection);
            res.end();
        })
    },
    getUserById: function(req, res) {
        var id = req.params.id;

        if(id) {
            User.findOne({_id: id}).exec(function(err, user) {
                if(err || !user) {
                    console.log('User could not be loaded');
                    return;
                }
                var userVM = {
                    '_id': user._id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    registrationDate: user.registrationDate,
                    lastLoginDate: user.lastLoginDate,
                    roles: user.roles
                };
                res.send(userVM);
                res.end();
            });
        }
    },
    register: function (req, res, next) {
        var newUserData = req.body;
        console.log(req.files);
        console.log(req.body);
        console.log(req);
//        if(usersValidator.isRegistrationValid(newUserData)) {
//            newUserData.salt = encryption.generateSalt();
//            newUserData.passHash = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
//            newUserData.roles = ['user'];
//            newUserData.registrationDate = new Date().toLocaleString();
//            newUserData.lastLoginDate = new Date().toLocaleString();
//            User.create(newUserData, function (err, user){
//                if(err){
//                    console.log('Failed to register new user: ' + err);
//                    return;
//                }
//                req.logIn(user, function (err) {
//                    if(err) {
//                        res.status(400);
//                        return res.send({reason: err.toString()});
//                    }
//
//                    res.send({success: true, message: "Registration successful!", user: user});
//                });
//            });
//        }
//        else {
//            res.send({success: false, message: "Please, enter correct user data!"});
//        }

    },
    updateUser: function (req, res, next) {
        var updatedUser = req.body;
        if(req.user._id == updatedUser._id) {
            if(usersValidator.isUpdateUserDataValid(updatedUser)) {
                if(updatedUser.newPassword && updatedUser.newPassword.length > 0) {
                    updatedUser.salt = encryption.generateSalt();
                    updatedUser.passHash = encryption.generateHashedPassword(updatedUser.salt, updatedUser.newPassword);
                }

                User.update({_id: updatedUser._id}, updatedUser, function(err) {
                    if(err) {
                        res.send({success: false, message: "Update profile failed!"});
                        res.end();
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
    },
    updateEditedUser: function (req, res, next) {
        var editedUser = req.body.user;
        if(editedUser.newRole) {
            User.update({_id: editedUser._id}, {$set: {roles: [editedUser.newRole]}}, {upsert: true}, function (err) {
                if(err) {
                    console.log('Edit user failed: ' + err);
                    res.send({success: false, message: "Edit user failed!"});
                    res.end();
                    return;
                }

                res.send({success: true, message: "Successful update!"});
            });
        }
        else {
            res.send({success: false, message: "Please, do some changes!"});
        }
    },
    deleteUser: function (req, res, next) {
        var userId = req.params.id;
        if(userId) {
            User.remove({_id: userId}, function (err) {
                if(err) {
                    console.log("A user was not removed from db: " + err);
                    res.send({success: false, message: "Delete failed!"});
                    res.end();
                    return;
                }
                else {
                    res.send({success: true, message: "Successful delete!"});
                    res.end();
                }
            })
        }
    }
};