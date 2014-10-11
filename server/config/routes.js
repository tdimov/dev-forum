var auth = require('./auth'),
    usersController = require('../controllers/usersController');

module.exports = function (app) {
    app.get('/partials/:partialArea/:partialName', function(req, res) {
        res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName);
    });

    app.get('/api/users',auth.isInRole('admin'), usersController.getAllUsers);
    app.post('/api/users', usersController.register);
    app.put('/api/users', auth.isAuthenticated, usersController.updateUser);

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.get('*', function (req, res){
        res.render('index', {currentUser: req.user});
    });
};