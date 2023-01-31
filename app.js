import http from "http";
import express from "express";
import createError from "http-errors";

import schedulerLoader from "./src/schedulers/index.js";
import state from "./src/utils/state.js";
import CONFIG from "./src/config/index.js";
import ERROR from "./src/config/error.js";
import axios from "axios";

const app = express();
const server = http.createServer(app);
const port = CONFIG.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  // personal proxy server setting...
  const url = req.query.url;

  if (url) {
    console.log(url);
    try {
      const result = await axios.get(url);

      return res.json({
        body: result.data,
      });
    } catch {
      return res.json({
        body: "error",
      });
    }
  }

  res.status(200).json({
    problem: state.getProblem(),
    url: state.getUrl(),
    latestWakedUp: state.getWakeUp(),
  });
});

app.use((req, res, next) => {
  next(createError(404, ERROR.PAGE_NOT_FOUND));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message });
});

schedulerLoader();

app.set("port", port);
server.listen(port, () => {
  console.log(`server listen on ${port}`);
});
