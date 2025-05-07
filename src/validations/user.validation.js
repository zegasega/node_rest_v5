const Joi = require('joi');

const userValidation = {
    create: Joi.object({
        username: Joi.string().required().min(3).max(30),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    }),
    update: Joi.object({
        username: Joi.string().min(3).max(30),
        email: Joi.string().email(),
        password: Joi.string().min(6)
    }),
    login: Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
};

module.exports = userValidation; 