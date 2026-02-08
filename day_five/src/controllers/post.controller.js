

const posts = [];
const comments = [];
const AppError = require('../utils/appError');

exports.createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const newPost = {
      id: posts.length + 1,
      title,
      content,
      createdAt: new Date()
    };
    posts.push(newPost);

    res.status(201).json({
      status: 'success',
      data: {
        post: newPost
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.createComment = async (req, res, next) => {
  try {
    const { content, postId } = req.body;

  
    const post = posts.find(p => p.id === postId);
    if (!post) {
       throw new AppError('Post not found', 404);
    }

    const newComment = {
      id: comments.length + 1,
      postId,
      content,
      createdAt: new Date()
    };

    comments.push(newComment);

    res.status(201).json({
      status: 'success',
      data: {
        comment: newComment
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: { posts }
    });
  } catch (error) {
    next(error);
  }
};
