var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/forumsystemdb',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://admin:forumsystemdbadmin@ds035290.mongolab.com:35290/forumsystemdb',
        port: process.env.PORT || 3030
    }
};