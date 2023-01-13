import http from "http";
import express from "express";
import "express-async-errors";

import CONFIG from "./src/config/index.js";
import ERROR from "./src/config/error.js";

const app = express();
const server = http.createServer(app);
const port = CONFIG.PORT;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get("/", (req, res) => {
  res.status(200).json({ result: "Success" });
});

// error handling
app.use((req, res, next) => {
  next(createError(404, ERROR.PAGE_NOT_FOUND));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message });
});

// start server
app.set("port", port);
server.listen(port, () => {
  console.log(`server listen on ${port}`);
});
