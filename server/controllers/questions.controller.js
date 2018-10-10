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

module.exports = {
  index
};
