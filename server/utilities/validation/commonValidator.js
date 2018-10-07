const validator = require('validator');

module.exports = {
  isNullOrEmpty(str) {
    return !str || validator.isNull(str);
  },
  areJsonPropsNullOrEmpty(obj) {
    for (const key in obj) {
      if (this.isNullOrEmpty(obj[key].toString())) {
        return false;
      }
    }

    return true;
  }
};
