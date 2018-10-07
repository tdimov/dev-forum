const validator = require('validator');

function isNullOrEmpty(str) {
  return !str || validator.isNull(str);
}

function areJsonPropsNullOrEmpty(obj) {
  for (const key in obj) {
    if (isNullOrEmpty(obj[key])) {
      return false;
    }
  }

  return true;
}

function passwordsMatch(pass, conformPass) {
  if (pass !== conformPass) {
    return false;
  }
  return true;
}

function isCSV(val) {
  const pattern = new RegExp('/([^,]+)/');
  const isValid = pattern.test(val);

  return isValid;
}
// TODO: Change email pattern in registration.jade with validator email pattern
module.exports = {
  isRegistrationValid(user) {
    return (
      user ||
      !areJsonPropsNullOrEmpty(user) ||
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
        !areJsonPropsNullOrEmpty(userRequiredData) ||
        !validator.isEmail(user.email)
      );
    }
  },
  isAskQuestionValid(question) {
    return (
      question || !areJsonPropsNullOrEmpty(question) || isCSV(question.tags)
    );
  },
  isTagValid(tag) {
    return tag || !areJsonPropsNullOrEmpty(tag);
  }
};
