const passport = require('passport');

const User = require('mongoose').model('User');

module.exports = {
  login(req, res, next) {
    const auth = passport.authenticate('local', (err, user) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        res.send({ success: false, message: 'Wrong username or password!' });
      }

      req.logIn(user, err => {
        if (err) {
          return next(err);
        }

        user.lastLoginDate = new Date();

        User.update(
          { _id: user._id },
          { $set: { lastLoginDate: new Date() } },
          { upsert: true },
          err => {
            if (err) {
              console.log(`Set last login date failed: ${err}`);
              return;
            }

            res.send({
              success: true,
              message: 'Successful login!',
              user
            });
          }
        );
      });
    });
    auth(req, res, next);
  },
  logout(req, res) {
    req.logout();
    res.send({ success: true, message: 'Successful logout!' });
    res.end();
  },
  isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403);
      res.write('Unauthorized request.');
      res.end();
    }
  },
  isInRole(role) {
    return (req, res, next) => {
      if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
        next();
      } else {
        res.status(403);
        res.write('Unauthorized request.');
        res.end();
      }
    };
  }
};
