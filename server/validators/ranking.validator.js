const Joi = require('joi');

const createRankingSchema = Joi.object().keys({
  firstPlacePrize: Joi.string().required(),
  secondPlacePrize: Joi.string().required(),
  thirdPlacePrize: Joi.string().required()
});

function isCreateRankingDataPresent(user) {
  const { error } = Joi.validate(user || {}, createRankingSchema);
  return error == null;
}

module.exports = {
  isCreateRankingDataPresent
};
