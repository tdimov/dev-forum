const tagsService = require('../services/tags.service');
const baseMapper = require('../mappers/base.mapper');

async function index(req, res, next) {
  try {
    const result = await tagsService.index(req.query);

    return res.status(200).send({
      error: null,
      result: baseMapper.transformMultipleToBaseModel(result)
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = {
  index
};
