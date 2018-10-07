const User = require('mongoose').model('User');
const encryption = require('../utilities/encryption');
const usersValidator = require('../utilities/validation/usersValidator');
const dateFormat = require('../utilities/dateFormat');

module.exports = {
  getAllUsers(req, res) {
    User.find({ _id: { $ne: req.user._id } }).exec((err, collection) => {
      if (err) {
        console.log(`Users could not be loaded: ${err}`);
        return;
      }

      res.send(collection);
      res.end();
    });
  },
  getUsersByReputation(req, res) {
    // var usersPerPage = req.params.pageId;

    User.find({})
      .sort('-reputation')
      .limit(20)
      .exec((err, users) => {
        if (err || !users) {
          console.log(`getUsersByReputation Cannot load users: ${err}`);
          return;
        }
        const models = [];
        for (let i = 0, len = users.length; i < len; i++) {
          const userVM = {
            id: users[i]._id,
            username: users[i].username,
            reputation: users[i].reputation
          };

          if (users[i].country && users[i].city) {
            userVM.address = `${users[i].city}, ${users[i].country}`;
          }

          models.push(userVM);
        }

        res.send(models);
        res.end();
      });
  },
  getUserById(req, res) {
    const { id } = req.params;

    if (id) {
      User.findOne({ _id: id })
        .populate('questions')
        .exec((err, user) => {
          if (err || !user) {
            console.log('User could not be loaded');
            return;
          }
          const questions = [];

          for (let i = 0, len = user.questions.length; i < len; i++) {
            const questionVM = {
              id: user.questions[i]._id,
              title: user.questions[i].title,
              rating: user.questions[i].rating
            };

            questions.push(questionVM);
          }

          const userVM = {
            _id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            reputation: user.reputation,
            aboutMe: 'n/a',
            address: 'n/a',
            website: 'n/a',
            email: user.email,
            registrationDate: dateFormat.createDateFormat(
              user.registrationDate
            ),
            lastLoginDate: dateFormat.createDateFormat(user.lastLoginDate),
            questions,
            roles: user.roles
          };
          if (user.website) {
            userVM.website = user.website;
          }
          if (user.aboutMe) {
            userVM.aboutMe = user.aboutMe;
          }
          if (user.city && user.country) {
            userVM.address = `${user.city}, ${user.country}`;
          }
          res.send(userVM);
          res.end();
        });
    }
  },
  searchUser(req, res) {
    const { query } = req.params;
    console.log(query);
    if (query) {
      User.find({})
        .sort('-reputation')
        .exec((err, users) => {
          if (err || !users) {
            console.log(`searchUser Cannot load users: ${err}`);
            return;
          }

          const searchedUsers = [];

          for (let i = 0, len = users.length; i < len; i++) {
            if (users[i].username.indexOf(query) > -1) {
              searchedUsers.push(users[i]);
            }
          }

          const models = [];

          for (let i = 0, len = searchedUsers.length; i < len; i++) {
            const userVM = {
              id: searchedUsers[i]._id,
              username: searchedUsers[i].username,
              reputation: searchedUsers[i].reputation
            };

            if (searchedUsers[i].country && searchedUsers[i].city) {
              userVM.address = `${searchedUsers[i].city}, ${
                searchedUsers[i].country
              }`;
            }

            models.push(userVM);
          }

          res.send(models);
          res.end();
        });
    } else {
      res.send([]);
      res.end();
    }
  },
  register(req, res, next) {
    const newUserData = req.body;
    //        if(usersValidator.isRegistrationValid(newUserData)) {
    //            newUserData.salt = encryption.generateSalt();
    //            newUserData.passHash = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
    //            newUserData.roles = ['user'];
    //            newUserData.registrationDate = new Date();
    //            newUserData.lastLoginDate = new Date();
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
  updateUser(req, res, next) {
    const updatedUser = req.body;
    if (req.user._id === updatedUser._id) {
      if (usersValidator.isUpdateUserDataValid(updatedUser)) {
        if (updatedUser.newPassword && updatedUser.newPassword.length > 0) {
          updatedUser.salt = encryption.generateSalt();
          updatedUser.passHash = encryption.generateHashedPassword(
            updatedUser.salt,
            updatedUser.newPassword
          );
        }

        User.update({ _id: updatedUser._id }, updatedUser, err => {
          if (err) {
            res.send({ success: false, message: 'Update profile failed!' });
            res.end();
          } else {
            res.send({ success: true, message: 'Successful update!' });
            res.end();
          }
        });
      } else {
        res.send({
          success: false,
          message: 'Please, enter correct user data!'
        });
      }
    } else {
      res.send({ success: false, message: 'Update profile failed!' });
      res.end();
    }
  },
  updateEditedUser(req, res, next) {
    const editedUser = req.body.user;
    if (editedUser.newRole) {
      User.update(
        { _id: editedUser._id },
        { $set: { roles: [editedUser.newRole] } },
        { upsert: true },
        err => {
          if (err) {
            console.log(`Edit user failed: ${err}`);
            res.send({ success: false, message: 'Edit user failed!' });
            res.end();
            return;
          }

          res.send({ success: true, message: 'Successful update!' });
        }
      );
    } else {
      res.send({ success: false, message: 'Please, do some changes!' });
    }
  },
  deleteUser(req, res, next) {
    const userId = req.params.id;
    if (userId) {
      User.remove({ _id: userId }, err => {
        if (err) {
          console.log(`A user was not removed from db: ${err}`);
          res.send({ success: false, message: 'Delete failed!' });
          res.end();
        } else {
          res.send({ success: true, message: 'Successful delete!' });
          res.end();
        }
      });
    }
  }
};
