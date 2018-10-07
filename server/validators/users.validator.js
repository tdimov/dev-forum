const Joi = require('joi');

const loginUserSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required()
});

function isLoginUserDataPresent(user) {
  const { error } = Joi.validate(user || {}, loginUserSchema);
  return error == null;
}

module.exports = {
  isLoginUserDataPresent
};
