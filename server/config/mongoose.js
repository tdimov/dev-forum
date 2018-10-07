const mongoose = require('mongoose');
const user = require('../models/user');
require('../models/question');
require('../models/tag');
require('../models/answer');
require('../models/vote');
require('../models/comment');

module.exports = config => {
  mongoose.connect(config.db);

  const db = mongoose.connection;
  db.once('open', err => {
    if (err) {
      console.log(`Database could not be opened: ${err}`);
      return;
    }

    console.log('Database up and running...');
  });

  db.on('error', err => {
    console.log(err);
  });

  user.seedInitialUsers();
};
