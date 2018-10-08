const Joi = require('joi');

const registerUserSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email()
    .required()
});

const loginUserSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required()
});

function isRegisterUserDataPresent(user) {
  const { error } = Joi.validate(user || {}, registerUserSchema);
  return error == null;
}

function isLoginUserDataPresent(user) {
  const { error } = Joi.validate(user || {}, loginUserSchema);
  return error == null;
}

module.exports = {
  isRegisterUserDataPresent,
  isLoginUserDataPresent
};
