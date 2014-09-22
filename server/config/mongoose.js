var mongoose = require('mongoose'),
    crypto = require('crypto');

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

    var userSchema = new mongoose.Schema({
        username: String,
        firstName: String,
        lastName: String,
        salt: String,
        passHash: String,
        roles: [String]
    });

    userSchema.method({
        authenticate: function (password) {
            if(generateHashedPassword(this.salt, password) === this.passHash) {
                return true;
            }
            else {
                return false;
            }
        }
    });
    var User = mongoose.model('User', userSchema);

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
            salt = generateSalt();
            hashedPass = generateHashedPassword(salt, 'Tihomir');
            User.create({username: 'tihomir.dimov', firstName: 'Tihomir', lastName: 'Dimov', salt: salt, passHash: hashedPass, roles: ['admin']});
            salt = generateSalt();
            hashedPass = generateHashedPassword(salt, 'Vladimir');
            User.create({username: 'vladimir.dimov', firstName: 'Vladimir', lastName: 'Dimov', salt: salt, passHash: hashedPass, roles: ['user']});
            console.log('Users addded to database');
        }
        //});
    });


};

function generateSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function generateHashedPassword(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}