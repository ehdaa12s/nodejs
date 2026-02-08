
const express = require('express');
const postController = require('../controllers/post.controller');
const validate = require('../middleware/validation');
const { createPostSchema, createCommentSchema } = require('../validators/post.schema');

const router = express.Router();

router.route('/')
    .get(postController.getAllPosts)
    .post(validate(createPostSchema), postController.createPost);

router.post('/comments', validate(createCommentSchema), postController.createComment);

module.exports = router;
