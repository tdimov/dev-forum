const AppError = require('../errors/app.error');
const { unauthorized } = require('../errors/http.errors');

const ADMIN_ROLE = 'admin';

async function isAdmin(req, res, next) {
  try {
    if (req.user.roles.indexOf(ADMIN_ROLE) === -1) {
      throw new AppError(
        unauthorized.type,
        unauthorized.httpCode,
        'Access denied!'
      );
    }

    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = {
  isAdmin
};
