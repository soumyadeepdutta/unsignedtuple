const { Post } = require("./models");
const router = require("express").Router();

/**
 * Get all posts
 * @public
 */
router.get("/", async (req, res) => {
  const posts = await Post.find();
  return res.json({ success: true, data: posts });
});
/**
 * Get one post by id
 * @public
 */
router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post)
    return res
      .status(404)
      .json({
        success: false,
        message: `post with id ${req.params.id} not found!`,
      });
  return res.json({ success: true, data: post });
});
/**
 * Create new post
 * @private
 */
router.post("/create", async (req, res) => {
  const post = await Post.create({
    title: req.body.title,
    body: req.body.body,
    image: req.body.image,
  });
  return res.json({
    success: true,
    message: `post created with id ${post._id}`,
  });
});
/**
 * Update a post with id
 * @private
 * @param id post id
 */
router.put("/update/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post)
    return res
      .status(404)
      .json({
        success: false,
        message: `post with id ${req.params.id} not found!`,
      });
  if (req.body.title) post.title = req.body.title;
  if (req.body.body) post.body = req.body.body;
  if (req.body.image) post.image = req.body.image;
  await post.save();
  return res.json({
    success: true,
    message: `post with id ${req.params.id} updated!`,
  });
});
/**
 * Delete a post with given id
 * @private
 * @param id post id
 */
router.delete("/delete/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post)
    return res
      .status(404)
      .json({
        success: false,
        message: `post with id ${req.params.id} not found!`,
      });
  await post.remove();
  return res.json({
    success: true,
    message: `post with id ${req.params.id} deleted!`,
  });
});

module.exports = router;
