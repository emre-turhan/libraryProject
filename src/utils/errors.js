class UserNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserNotFoundError';
        this.statusCode = 404;
    }
}

class UserAlreadyExistsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserAlreadyExistsError';
        this.statusCode = 400;
    }
}

class BookNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BookNotFoundError';
        this.statusCode = 404;
    }
}

class BookAlreadyBorrowedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BookAlreadyBorrowedError';
        this.statusCode = 400;
    }
}

class BookAlreadyExistsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BookAlreadyExistsError';
        this.statusCode = 400;
    }
}

class InvalidScoreError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidScoreError';
        this.statusCode = 400;
    }
}

class BorrowingRecordNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BorrowingRecordNotFoundError';
        this.statusCode = 400;
    }
}

module.exports = {
    UserNotFoundError,
    BookNotFoundError,
    BookAlreadyBorrowedError,
    BookAlreadyExistsError,
    UserAlreadyExistsError,
    InvalidScoreError,
    BorrowingRecordNotFoundError
};
