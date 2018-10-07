const {
  badRequest,
  unauthorized,
  forbidden,
  resourceNotFound
} = require('./http.errors');
const AppError = require('./app.error');

function generateResponseError(err) {
  return {
    type: err.type,
    httpCode: err.httpCode,
    message: err.message
  };
}

// eslint-disable-next-line
module.exports = (err, req, res, next) => {
  let error;
  switch (err.httpCode) {
    case badRequest.httpCode:
      error = generateResponseError(err);
      break;
    case unauthorized.httpCode:
      error = generateResponseError(err);
      break;
    case forbidden.httpCode:
      error = generateResponseError(err);
      break;
    case resourceNotFound.httpCode:
      error = generateResponseError(err);
      break;
    default:
      error = generateResponseError(
        new AppError(
          badRequest.type,
          badRequest.httpCode,
          'Something went wrong!'
        )
      );
      break;
  }

  return res.status(error.httpCode).json({ error, result: null });
};
