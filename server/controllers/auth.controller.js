const authService = require('../services/auth.service');
const usersMapper = require('../mappers/users.mapper');

async function register(req, res, next) {
  try {
    const result = await authService.register(req.body);

    return res.status(200).send({
      error: null,
      result
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const result = await authService.login(req.body);

    return res.status(200).send({
      error: null,
      result: usersMapper.transformToLoginUserResponse(result)
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = {
  register,
  login,
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
