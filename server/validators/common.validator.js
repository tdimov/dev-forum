const Joi = require('joi');

module.exports = {
  isMissing(prop) {
    return prop === null || prop === undefined || prop === '';
  },
  isInvalidNumber(prop) {
    const { error } = Joi.validate(prop, Joi.number().integer());

    return error !== null;
  }
};
