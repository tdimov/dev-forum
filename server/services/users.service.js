const User = require('mongoose').model('User');
const { isMissing } = require('../validators/common.validator');
const AppError = require('../errors/app.error');
const { resourceNotFound } = require('../errors/http.errors');

async function get(id) {
  const user = await User.findById(id);

  if (isMissing(user)) {
    throw new AppError(
      resourceNotFound.type,
      resourceNotFound.httpCode,
      `User does not exist!`
    );
  }

  return user;
}

module.exports = {
  get
};
