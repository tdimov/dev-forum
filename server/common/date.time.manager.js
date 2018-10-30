const moment = require('moment');

const DEFAULT_FORMAT = 'DD/MM/YYYY';

module.exports = {
  formatDate(date, dateFormat = DEFAULT_FORMAT) {
    return date ? moment(new Date(date)).format(dateFormat) : '';
  },
  getCurrentMonthAndYear() {
    return {
      month: moment().month() + 1,
      year: moment().year()
    };
  }
};
