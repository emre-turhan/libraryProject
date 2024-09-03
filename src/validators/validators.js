const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required()
});

const bookSchema = Joi.object({
    name: Joi.string().min(3).max(100).required()
});

const scoreSchema = Joi.object({
    score: Joi.number().min(0).max(10).required()
});

module.exports = {
    userSchema,
    bookSchema,
    scoreSchema,
};
