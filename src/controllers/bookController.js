const { createBook, getAllBooks, getBookDetails } = require('../services/bookService');
const { BookNotFoundError, BookAlreadyExistsError } = require('../utils/errors');
const {bookSchema} = require('../validators/validators');
const addBook = async (req, res) => {
    const { error } = bookSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const { name } = req.body;
        const book = await createBook(name);
        res.status(201).json({ message: 'Book successfully added.', book });
    } catch (error) {
        if (error instanceof BookAlreadyExistsError) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to add book' });
        }
    }
};

const listBooks = async (req, res) => {
    try {
        const books = await getAllBooks();
        res.status(200).json({ message: 'All books successfully listed.', books });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve books' });
    }
};

const getBookDetailsMethod = async (req, res) => {
    try {
        const { bookId } = req.params;
        const bookDetails = await getBookDetails(bookId);
        res.status(200).json({ message: 'Book details retrieved successfully.', bookDetails });
    } catch (error) {
        if (error instanceof BookNotFoundError) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to retrieve book details' });
        }
    }
};

module.exports = {
    addBook,
    listBooks,
    getBookDetailsMethod,
};
