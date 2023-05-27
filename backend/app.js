require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const rateLimit = require('./middlewares/rateLimit');
const { validateUserCreate, validateUserLogin } = require('./middlewares/validators');
const corsOrigins = require('./utils/cors-origins');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const auth = require('./middlewares/auth');

const { NotFoundError } = require('./errors/index-errors');
const handleErrors = require('./middlewares/handleErrors');

const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { PORT = 3000, MONGODB_CONNECT = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(helmet());
app.use(rateLimit);

app.use(cookieParser());

mongoose.connect(MONGODB_CONNECT);

app.use(cors(corsOrigins));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { createUser, login } = require('./controllers/users');

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateUserCreate, createUser);
app.post('/signin', validateUserLogin, login);
app.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход.' });
});

app.use(auth);

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);

app.use(errorLogger);

app.use(errors());

app.use((req, res, next) => {
  next(new NotFoundError('Такой страницы не существует.'));
});

app.use(handleErrors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Приложение слушает порт ${PORT}`);
});
