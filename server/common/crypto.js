const bcrypt = require('bcryptjs');

const ROUNDS = 12;

module.exports = {
  async hash(payload) {
    const salt = await bcrypt.genSalt(ROUNDS);
    const hashed = await bcrypt.hash(payload, salt);

    return hashed;
  },
  async compare(payload, hash) {
    const isValid = await bcrypt.compare(payload, hash);
    return isValid;
  }
};
