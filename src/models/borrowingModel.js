const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModel');
const Book = require('./bookModel');

const Borrowing = sequelize.define('Borrowing', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
    bookId: {
        type: DataTypes.INTEGER,
        references: {
            model: Book,
            key: 'id',
        },
    },
    score: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
}, {
    timestamps: false,
});

User.hasMany(Borrowing, { foreignKey: 'userId' });
Book.hasMany(Borrowing, { foreignKey: 'bookId' });
Borrowing.belongsTo(User, { foreignKey: 'userId' });
Borrowing.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = Borrowing;
