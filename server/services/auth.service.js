const User = require('mongoose').model('User');
const crypto = require('../common/crypto');
const usersValidator = require('../validators/users.validator');
const tokenManager = require('../common/token.manager');
const { isMissing } = require('../validators/common.validator');
const AppError = require('../errors/app.error');
const { badRequest, resourceNotFound } = require('../errors/http.errors');

async function login(payload) {
  const isUserValid = usersValidator.isLoginUserDataPresent(payload);

  if (!isUserValid) {
    throw new AppError(
      badRequest.type,
      badRequest.httpCode,
      'Wrong credentials entered. Please try again.'
    );
  }

  const user = await User.findOne({
    username: payload.username
  }).exec();

  if (isMissing(user)) {
    throw new AppError(
      resourceNotFound.type,
      resourceNotFound.httpCode,
      `Wrong credentials entered. Please try again.`
    );
  }

  // const isUserPasswrodValid = await user.validatePassword(payload.password);
  const isUserPasswrodValid = await crypto.compare(
    payload.password,
    user.passHash
  );

  if (!isUserPasswrodValid) {
    throw new AppError(
      badRequest.type,
      badRequest.httpCode,
      'Wrong credentials entered. Please try again.'
    );
  }

  const token = await tokenManager.generateToken(user);
  // await loginHistoryRepository.create({ userId: user.id, token });

  return { user, token };
}

module.exports = {
  login
};
