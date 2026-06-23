const router = require('express').Router();

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const {
  validateUserId,
  validateProfile,
  validateAvatar,
} = require('../middlewares/validation');

router.get('/users', getUsers);

router.get('/users/me', getCurrentUser);

router.get('/users/:id', validateUserId, getUserById);

router.patch('/users/me', validateProfile, updateProfile);

router.patch('/users/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
