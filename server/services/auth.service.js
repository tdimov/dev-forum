const User = require('mongoose').model('User');
const crypto = require('../common/crypto');
const usersValidator = require('../validators/users.validator');
const tokenManager = require('../common/token.manager');
const usersMapper = require('../mappers/users.mapper');
const usersRoles = require('../enums/users.roles');
const { isMissing } = require('../validators/common.validator');
const AppError = require('../errors/app.error');
const { badRequest, resourceNotFound } = require('../errors/http.errors');

async function register(payload) {
  const isUserDataValid = usersValidator.isRegisterUserDataPresent(payload);

  if (!isUserDataValid) {
    throw new AppError(
      badRequest.type,
      badRequest.httpCode,
      'Invalid register user data!'
    );
  }

  const existingUser = await User.findOne({
    username: payload.email
  });

  if (existingUser) {
    throw new AppError(
      badRequest.type,
      badRequest.httpCode,
      'Email address already used!'
    );
  }

  if (payload.password !== payload.confirmPassword) {
    throw new AppError(
      badRequest.type,
      badRequest.httpCode,
      'Passwords mismatch!'
    );
  }

  payload.passHash = await crypto.hash(payload.password);
  payload.roles = [usersRoles.user];
  payload.registrationDate = new Date();
  payload.lastLoginDate = new Date();

  const newUser = await User.create(usersMapper.transformToDbModel(payload));

  return newUser._id;
}

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
  await User.findByIdAndUpdate(
    { _id: user._id },
    { $set: { lastLoginDate: new Date() } }
  );
  // await loginHistoryRepository.create({ userId: user.id, token });

  return { user, token };
}

module.exports = {
  register,
  login
};
