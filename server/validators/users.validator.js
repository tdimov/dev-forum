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

const updateUserSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  country: Joi.string(),
  city: Joi.string(),
  website: Joi.string(),
  aboutMe: Joi.string(),
  avatar: Joi.string()
});

const changePasswordDataSchema = Joi.object().keys({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required()
});

function isRegisterUserDataPresent(user) {
  const { error } = Joi.validate(user || {}, registerUserSchema);
  return error == null;
}

function isLoginUserDataPresent(user) {
  const { error } = Joi.validate(user || {}, loginUserSchema);
  return error == null;
}

function isUpdateUserDataPresent(user) {
  const { error } = Joi.validate(user || {}, updateUserSchema);
  return error == null;
}

function isChangePasswordDataPresent(passwordData) {
  const { error } = Joi.validate(passwordData || {}, changePasswordDataSchema);
  return error == null;
}

module.exports = {
  isRegisterUserDataPresent,
  isLoginUserDataPresent,
  isUpdateUserDataPresent,
  isChangePasswordDataPresent
};
