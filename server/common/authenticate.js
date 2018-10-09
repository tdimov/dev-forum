const tokenManager = require('./token.manager');
const { isMissing } = require('../validators/common.validator');
const AppError = require('../errors/app.error');
const { unauthorized } = require('../errors/http.errors');

async function authenticate(req, res, next) {
  try {
    const token = req.headers['x-access-token'];

    if (isMissing(token)) {
      throw new AppError(
        unauthorized.type,
        unauthorized.httpCode,
        'Authentication failed!'
      );
    }

    // const savedToken = await loginHistoryRepository.get({
    //   token
    // });

    // if (isMissing(savedToken)) {
    //   throw new AppError(
    //     Unauthorized.type,
    //     Unauthorized.httpCode,
    //     errorMessages.auth.authenticationFailed
    //   );
    // }

    const verified = tokenManager.verifyToken(token);

    req.user = verified.sub;
    req.token = token;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = {
  authenticate
};
