const express = require('express');
const { addUser, listUsers , borrowBookMethod, returnBookMethod, getUser } = require('../controllers/userController');

const router = express.Router();

router.post('/users', addUser);

router.get('/users', listUsers);

router.post('/users/:userId/borrow/:bookId', borrowBookMethod);

router.post('/users/:userId/return/:bookId', returnBookMethod);

router.get('/users/:userId', getUser);

module.exports = router;
