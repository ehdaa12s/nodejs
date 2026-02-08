import Comment from "../models/Comment.js";

export const createComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      content: req.body.content,
      post: req.body.postId,
      user: req.user.id,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyComments = async (req, res) => {
  try {
    const comments = await Comment.find({ user: req.user.id })
      .populate("user", "name")
      .populate("post", "title");

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!comment)
      return res.status(403).json({ message: "Not allowed or comment not found" });

    res.json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!comment)
      return res.status(403).json({ message: "Not allowed or comment not found" });

    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
