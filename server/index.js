const formidable = require("formidable");
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
  const form = new formidable.IncomingForm();
  form.uploadDir = "./upload";
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
    }
    res.end("文件上传成功");
  });
});

app.listen(3000, () => {
  console.log("server running port on 3000");
});
