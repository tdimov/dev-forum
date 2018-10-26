const Tag = require('mongoose').model('Tag');
const { isMissing } = require('../validators/common.validator');
const AppError = require('../errors/app.error');
const { resourceNotFound } = require('../errors/http.errors');

async function index(query) {
  const { limit, offset, ...filters } = query;

  const tags = await Tag.find(filters)
    // .sort('-postedDate')
    .limit(Number(limit))
    .skip(Number(offset))
    .exec();

  return tags;
}

async function get(id) {
  const tag = await Tag.findById(id).exec();

  if (isMissing(tag)) {
    throw new AppError(
      resourceNotFound.type,
      resourceNotFound.httpCode,
      'Tag does not exist!'
    );
  }

  return tag;
}

module.exports = {
  index,
  get
};
