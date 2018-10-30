const mongoose = require('mongoose');
const crypto = require('../common/crypto');

const encryption = require('../utilities/encryption');

const userSchema = new mongoose.Schema({
  username: { type: String, require: '{PATH} is required', unique: true },
  firstName: { type: String, require: '{PATH} is required' },
  lastName: { type: String, require: '{PATH} is required' },
  aboutMe: { type: String },
  website: { type: String },
  reputation: { type: Number, default: 0 },
  country: { type: String },
  city: { type: String },
  email: { type: String, require: '{PATH} is required' },
  salt: String,
  passHash: String,
  registrationDate: { type: Date, require: '{PATH} is required' },
  lastLoginDate: { type: Date, default: new Date() },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  roles: [String]
});

userSchema.method({
  authenticate(password) {
    return (
      encryption.generateHashedPassword(this.salt, password) === this.passHash
    );
  }
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
  seedInitialUsers() {
    User.find({}).exec(async (err, collection) => {
      if (err) {
        console.log(`Cannot find users: ${err}`);
        return;
      }
      //        User.remove({}, function (err) {
      //            console.log('Users removed!');

      if (collection.length === 0) {
        let salt;
        let hashedPass;
        // salt = encryption.generateSalt();
        // hashedPass = encryption.generateHashedPassword(salt, 'Tihomir');
        hashedPass = await crypto.hash('Tihomir');
        User.create({
          username: 'tihomir.dimov',
          firstName: 'Tihomir',
          lastName: 'Dimov',
          email: 'tihomir@abv.bg',
          salt,
          passHash: hashedPass,
          registrationDate: new Date(),
          lastLoginDate: new Date(),
          roles: ['admin']
        });
        hashedPass = await crypto.hash('Vladimir');
        User.create({
          username: 'vladimir.dimov',
          firstName: 'Vladimir',
          lastName: 'Dimov',
          email: 'vladimir@abv.bg',
          salt,
          passHash: hashedPass,
          registrationDate: new Date(),
          lastLoginDate: new Date(),
          roles: ['user']
        });
        console.log('Users addded to database');
      }
      // });
    });
  }
};
