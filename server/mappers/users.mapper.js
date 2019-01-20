const dateTimeManager = require('../common/date.time.manager');

function transformFullName(user) {
  return user ? `${user.firstName} ${user.lastName}` : '';
}

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
    lastLoginDate: payload.lastLoginDate,
    avatar: payload.avatar
  };
}

function transformToUsersListModel(users) {
  return users.map(user => ({
    id: user._id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    reputation: user.reputation,
    avatar: user.avatar
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
    aboutMe: payload.aboutMe,
    avatar: payload.avatar
  };
}

function transformToUserProfileDetailsModel(user) {
  return {
    id: user._id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    address: user.city && user.country ? `${user.city}, ${user.country}` : '',
    website: user.website,
    aboutMe: user.aboutMe,
    reputation: user.reputation,
    avatar: user.avatar,
    lastLoginDate: dateTimeManager.formatDate(user.lastLoginDate),
    registrationDate: dateTimeManager.formatDate(user.registrationDate)
  };
}

module.exports = {
  transformFullName,
  transformToDbModel,
  transformToUsersListModel,
  transformToLoginUserResponse,
  transformToUserProfileDetailsModel,
  transformToUserProfileSettingsModel
};
