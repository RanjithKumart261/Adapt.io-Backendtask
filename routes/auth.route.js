const express = require('express');

const { login, register, getCurrentUser } = require('../controllers/auth.controller');

const auth = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/current', auth, getCurrentUser);

module.exports = router;