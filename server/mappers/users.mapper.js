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

module.exports = {
  transformToDbModel,
  transformToLoginUserResponse,
  transformToUserProfileSettingsModel
};
