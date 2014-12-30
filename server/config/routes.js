var auth = require('./auth'),
    usersController = require('../controllers/usersController'),
    questionsController = require('../controllers/questionsController'),
    answersController = require('../controllers/answersController'),
    commentsController = require('../controllers/commentsController'),
    tagsController = require('../controllers/tagsController');

module.exports = function (app) {
    app.get('/partials/:partialArea/:partialName', function(req, res) {
        res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName);
    });

    app.get('/api/users',auth.isInRole('admin'), usersController.getAllUsers);
    app.get('/api/users/:id', auth.isInRole('admin'), usersController.getUserById);
    app.post('/api/users', usersController.register);
    app.put('/api/users', auth.isAuthenticated, usersController.updateUser);
    app.put('/api/users/:user', auth.isInRole('admin'), usersController.updateEditedUser);
    app.delete('/api/users/:id', auth.isInRole('admin'), usersController.deleteUser);

    app.get('/api/questions', questionsController.getQuestions);
    app.get('/api/topQuestions', questionsController.getTopQuestions);
    app.get('/api/unansweredQuestions', questionsController.getUnansweredQuestions);
    app.get('/api/lastFiveQuestions', questionsController.getLastFiveQuestions);
    app.get('/api/questionsByTag/:tag', questionsController.getQuestionsByTag);
    app.get('/api/questions/:id', questionsController.getQuestionById);
    app.post('/api/questions', auth.isAuthenticated, questionsController.addQuestion);

    app.post('/api/answers', auth.isAuthenticated, answersController.addAnswer);

    app.post('/api/comments', auth.isAuthenticated, commentsController.addComment);

    app.get('/api/tags', tagsController.getTags);
    app.get('/api/tags/:id', tagsController.getTagById);
    app.get('/api/tagsAside', tagsController.getTagsAside)
    app.get('/tags/askQuestion', auth.isAuthenticated, tagsController.getTagsAskQuestion);
    app.post('/api/tags', auth.isInRole('admin'), tagsController.addTag);
    app.put('/api/tags', auth.isInRole('admin'), tagsController.updateTag);
    app.delete('/api/tags/:id', auth.isInRole('admin'), tagsController.deleteTag);

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.get('*', function (req, res){
        res.render('index', {currentUser: req.user});
    });
};