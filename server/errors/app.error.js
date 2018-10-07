class appError extends Error {
  constructor(type, httpCode, message) {
    super(message);
    this.type = type;
    this.httpCode = httpCode;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = appError;
