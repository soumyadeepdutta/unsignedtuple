const mongoose = require("mongoose");

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

// const userSchema = mongoose.Schema({
//   firstname: { type: String, required: [true, "First name required!"] },
//   lastname: { type: String, required: [true, "Last name required!"] },
//   email: { type: String, required: [true, "Email required!"] },
//   password: { type: String, required: [true, "Password required!"] },
// });

module.exports.Post = mongoose.model("Post", postSchema, "Posts");
// module.exports.User = mongoose.model("User", userSchema, "Users");
