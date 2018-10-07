const commonValidator = require('./commonValidator');

module.exports = {
  isTagValid(tag) {
    if (tag) {
      return !commonValidator.areJsonPropsNullOrEmpty(tag);
    }
  }
};
