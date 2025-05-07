const Joi = require('joi');

const postValidation = {
    create: Joi.object({
        title: Joi.string().required().min(3).max(100),
        content: Joi.string().required().min(10),
        userId: Joi.number().required()
    }),
    update: Joi.object({
        title: Joi.string().min(3).max(100),
        content: Joi.string().min(10),
        userId: Joi.number()
    })
};

module.exports = postValidation; 