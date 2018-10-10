const Joi = require('joi');

const createQuestionSchema = Joi.object().keys({
  title: Joi.string().required(),
  text: Joi.string().required(),
  tags: Joi.array().required()
});

function isCreateQuestionDataPresent(user) {
  const { error } = Joi.validate(user || {}, createQuestionSchema);
  return error == null;
}

module.exports = {
  isCreateQuestionDataPresent
};
