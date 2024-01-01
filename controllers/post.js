const Posts = require("../models/post.js");

const getPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (error) {
    console.log("🚀 ~ file: post.js:8 ~ getPosts ~ error:", error);
  }
};

const postCreate = async (req, res) => {
  try {
    const newPosts = await Posts.create(req.body);
    res.status(200).json(newPosts);
  } catch (error) {
    console.log("🚀 ~ file: post.js:17 ~ postCreate ~ error:", error);
  }
};


const postsUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePosts = await Posts.findById(id, req.body, { new: ture });
    res.status(200).json(updatePosts);
  } catch (error) {
    console.log("🚀 ~ file: post.js:37 ~ postsUpdate ~ error:", error);
  }
};
const postDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const delPost = await Posts.findByIdAndDelete(id);
    res.status(200).json({
      message: "Delete successful",
    });
  } catch (error) {
    console.log("🚀 ~ file: post.js:11 ~ getPosts ~ error:", error);
  }
};


module.exports = {
  getPosts,
  postCreate,
  postDelete,
  postsUpdate,
};
