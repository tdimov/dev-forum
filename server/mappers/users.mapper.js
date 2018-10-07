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

module.exports = {
  transformToLoginUserResponse
};
