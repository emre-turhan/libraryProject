const Book = require('../models/bookModel');
const { BookNotFoundError, BookAlreadyExistsError } = require('../utils/errors');

const createBook = async (name) => {
    const existingBook = await Book.findOne({ where: { name } });

    if (existingBook) {
        throw new BookAlreadyExistsError('A book with this name already exists');
    }

    return await Book.create({ name });
};

const getAllBooks = async () => {
    return await Book.findAll({
        attributes: ['id', 'name'], // Only retrieve id and name
    });
};

const getBookDetails = async (bookId) => {
    const book = await Book.findByPk(bookId);

    if (!book) {
        throw new BookNotFoundError('Book not found');
    }

    return {
        id: book.id,
        name: book.name,
        averageScore: book.averageScore,
    };
};

module.exports = {
    createBook,
    getAllBooks,
    getBookDetails,
};
