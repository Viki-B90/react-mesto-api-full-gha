require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleError = require('./middlewares/handleError');
const allRouters = require('./routes/index');

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(limiter);
app.use(requestLogger);
app.use('/', allRouters);
app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Приложение слушает порт ${PORT}`)
});