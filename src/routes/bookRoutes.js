const express = require('express');
const { addBook, listBooks , getBookDetailsMethod } = require('../controllers/bookController');
const {getUser} = require("../controllers/userController");

const router = express.Router();

router.post('/books', addBook);
router.get('/books', listBooks);
router.get('/books/:bookId', getBookDetailsMethod);

module.exports = router;
