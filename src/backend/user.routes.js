const router = require("express").Router();
const { User } = require("./models");
/**
 * Create a new user
 * @public
 */
router.post("/register", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).json({
      success: false,
      message: "User already exists with this email!",
    });
  user = await User.create(req.body);
  return res.json({
    success: true,
    message: `user created with id ${user._id}`,
  });
});
/**
 * Login an existing user
 * @public
 */
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const passwordMatched = await user.comparePassword(req.body.password);
  if (!passwordMatched)
    return res.status(400).json({
      success: false,
      message: "invalid credentials",
    });
  const token = await user.getJwtToken();
  return res.json({ success: true, token });
});

module.exports = router;
