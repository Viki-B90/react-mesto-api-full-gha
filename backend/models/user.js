const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const { imgUrlRegExp } = require('../utils/regexp');
const { UnauthError } = require('../errors/index-errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Необходима электронная почта.'],
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Указана неверная почта.',
    },
  },
  password: {
    type: String,
    required: [true, 'Необходим пароль.'],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Имя не должно быть короче 2-х символов.'],
    maxlength: [30, 'Имя не должно быть длиннее 30-и символов.'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Текст не может быть короче 2-х символов.'],
    maxlength: [30, 'Текст не может быть длиннее 30 символов.'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (avatar) => imgUrlRegExp.test(avatar),
      message: 'Неверный url изображения.',
    },
  },
}, { versionKey: false });

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthError('Неправильные почта или пароль.');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthError('Неправильные почта или пароль.');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
