const { createUser, getAllUsers, borrowBook, returnBook, getUserById } = require('../services/userService');
const { UserNotFoundError, BookNotFoundError, BookAlreadyBorrowedError, UserAlreadyExistsError, InvalidScoreError, BorrowingRecordNotFoundError } = require('../utils/errors');
const { userSchema, scoreSchema } = require('../validators/validators');

const addUser = async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const { name } = req.body;
        const user = await createUser(name);
        res.status(201).json({
            message: 'User successfully created',
            user,
        });
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to add user' });
        }
    }
};

const listUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({
            message: 'All users successfully listed',
            users,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

const borrowBookMethod = async (req, res) => {
    try {
        const { userId, bookId } = req.params;
        const result = await borrowBook(userId, bookId);
        res.status(200).json({
            message: 'Book successfully borrowed',
            result,
        });
    } catch (error) {
        if (error instanceof UserNotFoundError || error instanceof BookNotFoundError) {
            res.status(404).json({ error: error.message });
        } else if (error instanceof BookAlreadyBorrowedError) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to borrow book' });
        }
    }
};

const returnBookMethod = async (req, res) => {
    const { error } = scoreSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const { userId, bookId } = req.params;
        const { score } = req.body;
        const result = await returnBook(userId, bookId, score);
        res.status(200).json({
            message: 'Book successfully returned',
            result,
        });
    } catch (error) {
        if (error instanceof UserNotFoundError || error instanceof BookNotFoundError) {
            res.status(404).json({ error: error.message });
        } else if (error instanceof InvalidScoreError) {
            res.status(400).json({ error: error.message });
        } else if (error instanceof BorrowingRecordNotFoundError) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to return book' });
        }
    }
};

const getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await getUserById(userId);
        res.status(200).json({
            message: 'User information successfully retrieved',
            user,
        });
    } catch (error) {
        if (error instanceof UserNotFoundError) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to retrieve user information' });
        }
    }
};

module.exports = {
    addUser,
    listUsers,
    borrowBookMethod,
    returnBookMethod,
    getUser,
};
