const User = require('mongoose').model('User');
const usersValidator = require('../validators/users.validator');
const { isMissing } = require('../validators/common.validator');
const AppError = require('../errors/app.error');
const { badRequest, resourceNotFound } = require('../errors/http.errors');

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

async function update(id, payload) {
  const isValid = usersValidator.isUpdateUserDataPresent(payload);

  if (!isValid) {
    throw new AppError(
      badRequest.type,
      badRequest.httpCode,
      `Invalid user data!`
    );
  }

  await User.update({ _id: id }, payload).exec();
}

module.exports = {
  get,
  update
};
