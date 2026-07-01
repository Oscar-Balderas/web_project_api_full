const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = "dev-secret";

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;
        throw error;
      }

      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new Error("ID inválido");
        error.statusCode = 400;
        return next(error);
      }

      return next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;
        throw error;
      }

      return res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }),
    )
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        const error = new Error("Datos inválidos");
        error.statusCode = 400;
        return next(error);
      }

      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        const error = new Error("Correo o contraseña incorrectos");
        error.statusCode = 401;
        throw error;
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const error = new Error("Correo o contraseña incorrectos");
          error.statusCode = 401;
          throw error;
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });

        return res.send({ token });
      });
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;
        throw error;
      }

      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        const error = new Error("Datos inválidos");
        error.statusCode = 400;
        return next(error);
      }

      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;
        throw error;
      }

      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        const error = new Error("Datos inválidos");
        error.statusCode = 400;
        return next(error);
      }

      return next(err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  getCurrentUser,
  createUser,
  login,
  updateProfile,
  updateAvatar,
};
