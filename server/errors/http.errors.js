module.exports = {
  badRequest: {
    type: 'BadRequest',
    httpCode: 400
  },
  unauthorized: {
    type: 'Unauthorized',
    httpCode: 401
  },
  forbidden: {
    type: 'Forbidden',
    httpCode: 403
  },
  resourceNotFound: {
    type: 'ResourceNotFound',
    httpCode: 404
  },
  internalServerError: {
    type: 'InternalServerError',
    httpCode: 500
  }
};
