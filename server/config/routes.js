const auth = require('./auth');
const authController = require('../controllers/auth.controller');
const usersController = require('../controllers/users.controller');
const questionsController = require('../controllers/questions.controller');
const tagsController = require('../controllers/tags.controller');
const answersController = require('../controllers/answers.controller');
const rankingsController = require('../controllers/rankings.controller');
const { authenticate } = require('../common/authenticate');
const { isAdmin } = require('../common/authorize');

module.exports = app => {
  app.get('/partials/:partialArea/:partialName', (req, res) => {
    res.render(
      `../../public/app/${req.params.partialArea}/${req.params.partialName}`
    );
  });

  app.post('/api/register', authController.register);
  app.post('/api/login', authController.login);
  app.post('/api/logout', auth.logout);

  app.get('/api/users', usersController.index);
  app.get('/api/users/:id', usersController.get);
  app.get('/api/users/profile/me', authenticate, usersController.getProfile);
  app.put('/api/users/profile/me', authenticate, usersController.updateProfile);
  app.put(
    '/api/users/change-password',
    authenticate,
    usersController.changePassword
  );

  app.get('/api/questions', questionsController.index);
  app.get('/api/questions/:id', questionsController.get);
  app.post('/api/questions', authenticate, questionsController.create);
  app.put('/api/questions/:id/vote', authenticate, questionsController.vote);
  app.delete(
    '/api/questions/:id',
    authenticate,
    isAdmin,
    questionsController.del
  );

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

  app.get('*', (req, res) => {
    res.render('index', { currentUser: req.user });
  });
};
