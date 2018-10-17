const express = require('express');
const errorHandler = require('./server/errors');

const env = process.env.NODE_ENV || 'development';

const app = express();
const config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport')();
require('./server/config/routes')(app);

// Error handling middleware, we delegate the handling to the centralized error handler
app.use(errorHandler);

app.listen(config.port);
console.log(`Server is listening to on port: ${config.port}`);
