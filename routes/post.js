const express = require("express");
const {
  getPosts,
  postCreate,
  postsUpdate,
  postDelete,
} = require("../controllers/post");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/get-posts", getPosts);
router.post("/create-post",auth, postCreate);
router.patch("/update-posts/:id",auth, postsUpdate);
router.delete("/delete-posts/:id",auth, postDelete);


module.exports = router;
