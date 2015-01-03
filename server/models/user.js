var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = new mongoose.Schema({
    username: { type: String, require: '{PATH} is required', unique: true },
    firstName: { type: String, require: '{PATH} is required'},
    lastName: { type: String, require: '{PATH} is required'},
    reputation: {type: Number, default: 0},
    country: String,
    city: String,
    email: { type: String, require: '{PATH} is required'},
    salt: String,
    passHash: String,
    registrationDate: { type: String, require: '{PATH} is required'},
    lastLoginDate: String,
    roles: [String]
});

userSchema.method({
    authenticate: function (password) {
        if(encryption.generateHashedPassword(this.salt, password) === this.passHash) {
            return true;
        }
        else {
            return false;
        }
    }
});

var User = mongoose.model('User', userSchema);

module.exports.seedInitialUsers = function () {
    User.find({}).exec(function(err, collection) {
        if(err) {
            console.log('Cannot find users: ' + err);
            return;
        }
//        User.remove({}, function (err) {
//            console.log('Users removed!');

        if(collection.length === 0) {
            var salt;
            var hashedPass;
            salt = encryption.generateSalt();
            hashedPass = encryption.generateHashedPassword(salt, 'Tihomir');
            User.create({username: 'tihomir.dimov', firstName: 'Tihomir', lastName: 'Dimov', email: "tihomir@abv.bg", salt: salt, passHash: hashedPass, registrationDate: new Date().toLocaleString(), lastLoginDate: new Date().toLocaleString(), roles: ['admin']});
            salt = encryption.generateSalt();
            hashedPass = encryption.generateHashedPassword(salt, 'Vladimir');
            User.create({username: 'vladimir.dimov', firstName: 'Vladimir', lastName: 'Dimov', email: "vladimir@abv.bg", salt: salt, passHash: hashedPass, registrationDate: new Date().toLocaleString(), lastLoginDate: new Date().toLocaleString(), roles: ['user']});
            console.log('Users addded to database');
        }
        //});
    });
};