const dateTimeManager = require('../common/date.time.manager');

function transformToLoginUserResponse({ user, token }) {
  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: user.roles
    }
  };
}

function transformToDbModel(payload) {
  return {
    username: payload.username,
    passHash: payload.passHash,
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    roles: payload.roles,
    registrationDate: payload.registrationDate,
    lastLoginDate: payload.lastLoginDate
  };
}

function transformToUsersListModel(users) {
  return users.map(user => ({
    id: user._id,
    username: user.username,
    reputation: user.reputation
  }));
}

function transformToUserProfileSettingsModel(payload) {
  return {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    country: payload.country,
    city: payload.city,
    website: payload.website,
    aboutMe: payload.aboutMe
  };
}

function transformToUserProfileDetailsModel(user) {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    address: user.city && user.country ? `${user.city}, ${user.country}` : '',
    website: user.website,
    aboutMe: user.aboutMe,
    reputation: user.reputation,
    lastLoginDate: dateTimeManager.formatDate(user.lastLoginDate),
    registrationDate: dateTimeManager.formatDate(user.registrationDate)
  };
}

module.exports = {
  transformToDbModel,
  transformToUsersListModel,
  transformToLoginUserResponse,
  transformToUserProfileDetailsModel,
  transformToUserProfileSettingsModel
};
