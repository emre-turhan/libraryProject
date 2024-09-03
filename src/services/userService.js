const User = require('../models/userModel');
const Book = require('../models/bookModel');
const Borrowing = require('../models/borrowingModel');
const { UserNotFoundError, BookNotFoundError, BookAlreadyBorrowedError, UserAlreadyExistsError, InvalidScoreError,
    BorrowingRecordNotFoundError
} = require('../utils/errors');

const createUser = async (name) => {
    const existingUser = await User.findOne({ where: { name } });
    if (existingUser) {
        throw new UserAlreadyExistsError('User with this name already exists');
    }

    return await User.create({ name });
};

const getAllUsers = async () => {
    return await User.findAll();
};

const borrowBook = async (userId, bookId) => {
    const user = await User.findByPk(userId);
    const book = await Book.findByPk(bookId);

    if (!user) {
        throw new UserNotFoundError('User not found');
    }
    if (!book) {
        throw new BookNotFoundError('Book not found');
    }

    const existingBorrowing = await Borrowing.findOne({
        where: {
            bookId,
            score: null, // Book not returned yet
        },
    });

    if (existingBorrowing) {
        throw new BookAlreadyBorrowedError('This book is already borrowed by another user');
    }

    await book.update({ borrowCount: book.borrowCount + 1 });

    return await Borrowing.create({
        userId,
        bookId,
    });
};



const returnBook = async (userId, bookId, score) => {

    const user = await User.findByPk(userId);
    const book = await Book.findByPk(bookId);

    if (!user) {
        throw new UserNotFoundError('User not found');
    }
    if (!book) {
        throw new BookNotFoundError('Book not found');
    }

    const borrowing = await Borrowing.findOne({
        where: {
            userId,
            bookId,
            score: null,
        },
    });

    if (!borrowing) {
        throw new BorrowingRecordNotFoundError('Borrowing record not found');
    }

    await borrowing.update({ score });

    let averageScore;
    if (book.averageScore === -1) {
        averageScore = score;
    } else {
        averageScore = (book.averageScore * (book.borrowCount - 1) + score) / book.borrowCount;
    }

    await book.update({ averageScore });

    return borrowing;
};

const getUserById = async (userId) => {
    const user = await User.findByPk(userId, {
        include: {
            model: Borrowing,
            include: {
                model: Book,
                attributes: ['name'],
            },
        },
    });

    if (!user) {
        throw new UserNotFoundError('User not found');
    }

    const past = [];
    const present = [];

    user.Borrowings.forEach((borrowing) => {
        if (borrowing.score === null) {
            present.push({
                name: borrowing.Book.name,
            });
        } else {
            past.push({
                name: borrowing.Book.name,
                userScore: borrowing.score,
            });
        }
    });

    return {
        id: user.id,
        name: user.name,
        books: {
            past,
            present,
        },
    };
};

module.exports = {
    createUser,
    getAllUsers,
    borrowBook,
    returnBook,
    getUserById,
};

