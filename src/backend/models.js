const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: [true, "Enter post title"] },
    body: { type: String, required: [true, "Enter post body"] },
    image: { type: String, required: [true, "Enter post cover image link"] },
  },
  {
    timestamps: true,
  }
);

const userSchema = mongoose.Schema({
  firstname: { type: String, required: [true, "First name required!"] },
  lastname: { type: String, required: [true, "Last name required!"] },
  email: { type: String, required: [true, "Email required!"] },
  password: { type: String, required: [true, "Password required!"] },
});

// encrypting password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// returns a JSON Web Token(JWT)
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

// comapre saved password with password entered by the user
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports.Post = mongoose.model("Post", postSchema, "Posts");
module.exports.User = mongoose.model("User", userSchema, "Users");
