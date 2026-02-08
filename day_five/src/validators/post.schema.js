
const Joi = require('joi');

const createPostSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  content: Joi.string().min(10).required()
});

const createCommentSchema = Joi.object({
  content: Joi.string().min(1).required(),
  postId: Joi.number().integer().required() 
});

module.exports = {
  createPostSchema,
  createCommentSchema
};
