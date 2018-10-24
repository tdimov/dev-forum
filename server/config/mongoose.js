const mongoose = require('mongoose');
const user = require('../models/user');
require('../models/tag');
require('../models/answer');
require('../models/vote');
require('../models/comment');
require('../models/answer.vote');
require('../models/question');

const canDrop = true;

module.exports = config => {
  mongoose.connect(
    config.db,
    {
      useNewUrlParser: true
    }
  );

  const db = mongoose.connection;

  db.once('open', err => {
    if (err) {
      console.log(`Database could not be opened: ${err}`);
      return;
    }

    if (canDrop) {
      // mongoose.connection.db.dropDatabase();
    }
    console.log('Database up and running...');
  });

  db.on('error', err => {
    console.log(err);
  });

  user.seedInitialUsers();
};
