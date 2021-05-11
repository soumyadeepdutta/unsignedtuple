const posts = [
  {
    id: 1,
    title: "Hello World.",
    body: "Hello World. This is my first blog post",
  },
  {
    id: 2,
    title: "About",
    body: "This blog is powered by MERN",
  },
];

module.exports = function (app) {
  app.get("/api/posts", (req, res) => {
    res.send(posts);
  });
};
