const express = require('express');
const { signUp, signIn, signOut, getMe } = require('../controllers/auth');

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);
router.get('/me', getMe);

module.exports = router;