require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const rateLimit = require('./middlewares/rateLimit');
const corsOrigins = require('./utils/cors-origins');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const handleErrors = require('./middlewares/handleErrors');

const allRoutes = require('./routes/index');

const { PORT = 3000, MONGODB_CONNECT = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(requestLogger);

app.use(helmet());
app.use(rateLimit);

app.use(cookieParser());

mongoose.connect(MONGODB_CONNECT);

app.use(cors(corsOrigins));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', allRoutes);

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Приложение слушает порт ${PORT}`);
});
