import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user: req.user.id,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id })
      .populate("user", "name email");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!post)
      return res.status(403).json({ message: "Not allowed or post not found" });

    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!post)
      return res.status(403).json({ message: "Not allowed or post not found" });

    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
