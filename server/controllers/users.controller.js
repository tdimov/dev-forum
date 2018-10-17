const usersService = require('../services/users.service');
const usersMapper = require('../mappers/users.mapper');

async function getProfile(req, res, next) {
  try {
    const userId = req.user.id;
    const result = await usersService.get(userId);

    return res.status(200).send({
      error: null,
      result: usersMapper.transformToUserProfileSettingsModel(result)
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function updateProfile(req, res, next) {
  try {
    const userId = req.user.id;
    await usersService.update(userId, req.body);

    return res.status(204).end();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = {
  getProfile,
  updateProfile
};