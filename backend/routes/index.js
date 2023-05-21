const express = require('express');
const cors = require('cors');
const auth = require('../middlewares/auth');
const routesUsers = require('./users');
const routesCards = require('./cards');
const { validateSignUp, validateSignIn } = require('../middlewares/validators');
const { createUser, login } = require('../controllers/users');

const { NotFoundError } = require('../errors/index-errors');

const router = express.Router();

const allowedCors = [
  'https://domainname.students.nomoredomains.monster',
  'http://domainname.students.nomoredomains.monster',
  'https://api.domainname.stud.viki.nomoredomains.monster',
  'http://api.domainname.stud.viki.nomoredomains.monster',
  'localhost:3000',
  'localhost:3001',
];

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use(cors({
  origin: allowedCors,
  credentials: true,
}));

router.post('/signup', validateSignUp, createUser);
router.post('/signin', validateSignIn, login);
router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use('/users', auth, routesUsers);
router.use('/cards', auth, routesCards);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Запрашиваемый URL не найден'));
});

module.exports = router;