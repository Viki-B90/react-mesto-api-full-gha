const express = require('express');

const auth = require('../middlewares/auth');
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const { validateUserCreate, validateUserLogin } = require('../middlewares/validators');
const { createUser, login } = require('../controllers/users');

const { NotFoundError } = require('../errors/index-errors');

const router = express.Router();

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', validateUserCreate, createUser);
router.post('/signin', validateUserLogin, login);
router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use('/users', auth, usersRoutes);
router.use('/cards', auth, cardsRoutes);

router.all('*', auth, (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует.'));
});

module.exports = router;