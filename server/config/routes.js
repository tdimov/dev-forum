const auth = require('./auth');
const usersController = require('../controllers/usersController');
const questionsController = require('../controllers/questionsController');
const answersController = require('../controllers/answersController');
const commentsController = require('../controllers/commentsController');
const tagsController = require('../controllers/tagsController');

module.exports = app => {
  app.get('/partials/:partialArea/:partialName', (req, res) => {
    res.render(
      `../../public/app/${req.params.partialArea}/${req.params.partialName}`
    );
  });

  app.get('/api/users', auth.isInRole('admin'), usersController.getAllUsers);
  app.get('/api/users/:id', usersController.getUserById);
  app.get('/api/usersByReputation', usersController.getUsersByReputation);
  app.get('/users/searchUser/:query', usersController.searchUser);
  app.post('/api/users', usersController.register);
  app.put('/api/users', auth.isAuthenticated, usersController.updateUser);
  app.put(
    '/api/users/:user',
    auth.isInRole('admin'),
    usersController.updateEditedUser
  );
  app.delete(
    '/api/users/:id',
    auth.isInRole('admin'),
    usersController.deleteUser
  );

  app.get('/api/questions', questionsController.getQuestions);
  app.get('/api/topQuestions', questionsController.getTopQuestions);
  app.get(
    '/api/unansweredQuestions',
    questionsController.getUnansweredQuestions
  );
  app.get('/api/lastFiveQuestions', questionsController.getLastFiveQuestions);
  app.get('/api/questionsByTag/:tag', questionsController.getQuestionsByTag);
  app.get('/api/questions/:id', questionsController.getQuestionById);
  app.post(
    '/api/questionsVoteUp',
    auth.isAuthenticated,
    questionsController.voteUp
  );
  app.post(
    '/api/questionsVoteDown',
    auth.isAuthenticated,
    questionsController.voteDown
  );
  app.post(
    '/api/questions',
    auth.isAuthenticated,
    questionsController.addQuestion
  );
  app.put(
    '/api/lockQuestion/:id',
    auth.isInRole('admin'),
    questionsController.lockQuestion
  );
  app.delete(
    '/api/questions/:id',
    auth.isInRole('admin'),
    questionsController.deleteQuestion
  );

  app.post('/api/answers', auth.isAuthenticated, answersController.addAnswer);
  app.post(
    '/api/answersVoteUp',
    auth.isAuthenticated,
    answersController.voteUp
  );
  app.post(
    '/api/answersVoteDown',
    auth.isAuthenticated,
    answersController.voteDown
  );

  app.post(
    '/api/comments',
    auth.isAuthenticated,
    commentsController.addComment
  );

  app.get('/api/tags', tagsController.getTags);
  app.get('/api/tags/:id', tagsController.getTagById);
  app.get('/api/tagsAside', tagsController.getTagsAside);
  app.get('/tags/searchTag/:query', tagsController.searchTag);
  app.get(
    '/tags/askQuestion',
    auth.isAuthenticated,
    tagsController.getTagsAskQuestion
  );
  app.post('/api/tags', auth.isInRole('admin'), tagsController.addTag);
  app.put('/api/tags', auth.isInRole('admin'), tagsController.updateTag);
  app.delete('/api/tags/:id', auth.isInRole('admin'), tagsController.deleteTag);

  app.post('/login', auth.login);
  app.post('/logout', auth.logout);

  app.get('*', (req, res) => {
    res.render('index', { currentUser: req.user });
  });
};
