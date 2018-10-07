const validator = require('validator');
const commonValidator = require('./commonValidator');

function passwordsMatch(pass, conformPass) {
  return pass !== conformPass;
}

module.exports = {
  isRegistrationValid(user) {
    return (
      user ||
      !commonValidator.areJsonPropsNullOrEmpty(user) ||
      !passwordsMatch(user.password, user.confirmPassword) ||
      !validator.isEmail(user.email)
    );
  },
  // TODO: Check passwords
  isUpdateUserDataValid(user) {
    if (user) {
      const userRequiredData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      };

      return (
        !commonValidator.areJsonPropsNullOrEmpty(userRequiredData) ||
        !validator.isEmail(user.email)
      );
    }
  }
};
