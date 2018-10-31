const auth = require('./auth');
const authController = require('../controllers/auth.controller');
const newUsersController = require('../controllers/users.controller');
const questionsController = require('../controllers/questions.controller');
const tagsController = require('../controllers/tags.controller');
const answersController = require('../controllers/answers.controller');
const usersController = require('../controllers/usersController');
const rankingsController = require('../controllers/rankings.controller');
const { authenticate } = require('../common/authenticate');
const { isAdmin } = require('../common/authorize');

module.exports = app => {
  app.get('/partials/:partialArea/:partialName', (req, res) => {
    res.render(
      `../../public/app/${req.params.partialArea}/${req.params.partialName}`
    );
  });

  // new routes
  app.post('/api/register', authController.register);
  app.post('/api/login', authController.login);
  app.post('/api/logout', auth.logout);

  app.get('/api/users', newUsersController.index);
  app.get('/api/users/:id', newUsersController.get);
  app.get('/api/users/profile/me', authenticate, newUsersController.getProfile);
  app.put(
    '/api/users/profile/me',
    authenticate,
    newUsersController.updateProfile
  );

  app.get('/api/questions', questionsController.index);
  app.get('/api/questions/:id', questionsController.get);
  app.post('/api/questions', authenticate, questionsController.create);
  app.put('/api/questions/:id/vote', authenticate, questionsController.vote);

  app.post(
    '/api/questions/:id/answers',
    authenticate,
    answersController.create
  );
  app.put(
    '/api/questions/:id/answers/:answerId/vote',
    authenticate,
    answersController.vote
  );

  app.get('/api/tags', tagsController.index);
  app.post('/api/tags', tagsController.create);

  app.get('/api/rankings', rankingsController.getCurrentRanking);
  app.post('/api/rankings', authenticate, isAdmin, rankingsController.create);
  app.put(
    '/api/rankings',
    authenticate,
    isAdmin,
    rankingsController.finishCurrentRanking
  );
  // new routes

  // app.get('/api/users', auth.isInRole('admin'), usersController.getAllUsers);
  // app.get('/api/users/:id', usersController.getUserById);
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

  app.get('*', (req, res) => {
    res.render('index', { currentUser: req.user });
  });
};
