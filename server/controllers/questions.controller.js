const questionsService = require('../services/questions.service');
const questionsMapper = require('../mappers/questions.mapper');

async function index(req, res, next) {
  try {
    const result = await questionsService.index(req.query);

    return res.status(200).send({
      error: null,
      result: questionsMapper.transformToQuestionsListModel(result)
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const result = await questionsService.create(req.body, req.user.id);

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
  create
};
