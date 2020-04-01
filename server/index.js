const express = require("express");

const app = express();

app.use("/static", express.static("./server/public"));

app.use((req, res, next) => {
  const { token } = req.query;
  if (token) {
    return next();
  }
  res.send("缺少token");
});

app.get(
  "/",
  (req, res, next) => {
    console.log("middleware");
    next();
  },
  (req, res) => {
    res.send(`<h1>Welcome Home</h1>token: ${req.query.token}`);
  }
);

app.post("/upload", (req, res) => {
  res.send("upload success!");
});

app.listen(3000, () => {
  console.log("server running port on 3000");
});
