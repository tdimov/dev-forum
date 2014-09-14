var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalPassport = require('passport-local'),
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
        passHash: String
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
            User.create({username: 'tihomir.dimov', firstName: 'Tihomir', lastName: 'Dimov', salt: salt, passHash: hashedPass});
            salt = generateSalt();
            hashedPass = generateHashedPassword(salt, 'Vladimir');
            User.create({username: 'vladimir.dimov', firstName: 'Vladimir', lastName: 'Dimov', salt: salt, passHash: hashedPass});
            console.log('Users addded to database');
        }
        //});
    });

    passport.use(new LocalPassport(function (username, password, done){
        User.findOne({username: username}).exec(function (err, user) {
            if(err) {
                console.log('Error loading user: ' + err);
                return;
            }
            if(user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }

        });
    }));

    passport.serializeUser(function (user, done){
       if(user) {
           return done(null, user._id);
       }
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({_id: id}).exec(function (err, user) {
            if(err) {
                console.log('Error loading user: ' + err);
                return;
            }
            if(user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    });
};

function generateSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function generateHashedPassword(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}