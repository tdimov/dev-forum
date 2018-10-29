const Tag = require('mongoose').model('Tag');
const { isMissing } = require('../validators/common.validator');
const AppError = require('../errors/app.error');
const { badRequest, resourceNotFound } = require('../errors/http.errors');

async function index(query) {
  const filter = {};

  if (query.name) {
    filter.name = { $regex: `.*${query.name}.*` };
  }

  const tags = await Tag.find(filter)
    .limit(Number(query.limit))
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

async function create(payload) {
  const { name } = payload;

  if (isMissing(name)) {
    throw new AppError(
      badRequest.type,
      badRequest.httpCode,
      'Tag data is not valid!'
    );
  }

  const tag = await Tag.findOne({ name });

  if (!isMissing(tag)) return tag;

  const newTag = await Tag.create({ name });

  return newTag.id;
}

module.exports = {
  index,
  get,
  create
};
