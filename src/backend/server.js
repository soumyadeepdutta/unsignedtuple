const path = require("path");
const express = require("express");
const app = express();
const routes = require("./routes");
require("dotenv").config();

// server react build
app.use("/", express.static(path.join(__dirname, "../../build")));

// handle all api routes
routes(app);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started on ${port} in ${process.env.NODE_ENV} mode.`);
});
