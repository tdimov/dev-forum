const { User } = require('../models/user');
const usersValidator = require('../validators/users.validator');
const { isMissing } = require('../validators/common.validator');
const AppError = require('../errors/app.error');
const { badRequest, resourceNotFound } = require('../errors/http.errors');

async function index(query) {
  const users = await User.find(query).exec();

  return users;
}

async function getUsersByReputation(query) {
  const { limit, offset, ...filters } = query;

  const users = await User.find(filters)
    .sort('-reputation')
    .limit(Number(limit))
    .skip(Number(offset))
    .exec();

  return users;
}

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

  await User.findOneAndUpdate({ _id: id }, payload).exec();
}

async function updateReputation(userId, incValue) {
  await User.findOneAndUpdate(
    { _id: userId },
    { $inc: { reputation: incValue } }
  );
}

function resetUsersReputation() {
  User.update({}, { $set: { reputation: 0 } }, { multi: true}).exec();
}

module.exports = {
  index,
  getUsersByReputation,
  get,
  update,
  updateReputation,
  resetUsersReputation
};
