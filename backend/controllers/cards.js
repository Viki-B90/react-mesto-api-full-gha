const Cards = require('../models/card');
const statusCode = require('../utils/statusCode')

const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require('../errors/index-errors');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user.payload;

  Cards.create({ name, link, owner })
    .then((card) => res.status(statusCode.CREATED).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные для создания карточки.'));
      } else {
        next(error);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Cards.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.payload } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Карточка не найдена.'))
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.deleteLike = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user.payload } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Карточка не найдена.'))
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const owner = req.user.payload;
  Cards.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      if (String(card.owner) !== owner) {
        throw new ForbiddenError('Вы не можете удалить чужую карточку');
      }
      return Cards.findByIdAndRemove(cardId)
        .then(() => res.send({ message: 'Карточка успешно удалена' }))
        .catch(next);
    })
    .catch(next);
};
