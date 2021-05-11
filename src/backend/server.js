const path = require("path");
const express = require("express");
const app = express();
const routes = require("./routes");

// server react build
app.use("/", express.static(path.join(__dirname, "../../build")));

// handle all api routes
routes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
