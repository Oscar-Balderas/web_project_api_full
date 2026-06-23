const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new Error('Datos inválidos');
        error.statusCode = 400;
        return next(error);
      }

      return next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        const error = new Error('Tarjeta no encontrada');
        error.statusCode = 404;
        throw error;
      }

      if (card.owner.toString() !== req.user._id) {
        const error = new Error('No tienes permiso para eliminar esta tarjeta');
        error.statusCode = 403;
        throw error;
      }

      return Card.findByIdAndDelete(req.params.cardId).then((deletedCard) => res.send(deletedCard));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new Error('ID inválido');
        error.statusCode = 400;
        return next(error);
      }

      return next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        const error = new Error('Tarjeta no encontrada');
        error.statusCode = 404;
        throw error;
      }

      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new Error('ID inválido');
        error.statusCode = 400;
        return next(error);
      }

      return next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        const error = new Error('Tarjeta no encontrada');
        error.statusCode = 404;
        throw error;
      }

      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new Error('ID inválido');
        error.statusCode = 400;
        return next(error);
      }

      return next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
