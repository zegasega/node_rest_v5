const Joi = require('joi');

const createPost = {
  body: Joi.object().keys({
    title: Joi.string().required().min(3).max(100),
    content: Joi.string().required().min(10),
  }),
};

const updatePost = {
  params: Joi.object().keys({
    postId: Joi.number().required(),
  }),
  body: Joi.object().keys({
    title: Joi.string().min(3).max(100),
    content: Joi.string().min(10),
  }).min(1),
};

const deletePost = {
  params: Joi.object().keys({
    postId: Joi.number().required(),
  }),
};

const getPost = {
  params: Joi.object().keys({
    postId: Joi.number().required(),
  }),
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPost,
}; 