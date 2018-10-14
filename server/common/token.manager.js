const jwt = require('jsonwebtoken');
const AppError = require('../errors/app.error');
const { unauthorized } = require('../errors/http.errors');

const AUTH_TOKEN_SECRET_KEY = 'secret-key';

module.exports = {
  generateToken(user, opts = {}) {
    const token = jwt.sign(
      {
        sub: {
          id: user.id,
          username: user.username,
          roles: user.roles
        }
      },
      AUTH_TOKEN_SECRET_KEY,
      opts
    );

    return token;
  },
  verifyToken(token) {
    try {
      return jwt.verify(token, AUTH_TOKEN_SECRET_KEY);
    } catch (err) {
      throw new AppError(
        unauthorized.type,
        unauthorized.httpCode,
        'Ivalid or expired token!'
      );
    }
  }
};
