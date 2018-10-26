const tagsService = require('../services/tags.service');
const tagsMapper = require('../mappers/tags.mapper');

async function index(req, res, next) {
  try {
    const result = await tagsService.index(req.query);

    return res.status(200).send({
      error: null,
      result: tagsMapper.transformToTagsModel(result)
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function get(req, res, next) {
  try {
    const tagId = req.params.id;
    const result = await tagsService.get(tagId);

    return res.status(200).send({
      error: null,
      result: tagsMapper.transformToTagModel(result)
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const result = await tagsService.create(req.body);

    return res.status(201).send({
      error: null,
      result
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = {
  index,
  get,
  create
};
