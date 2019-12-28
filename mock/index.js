export default {
  "GET /api/products": (req, res) => {
    setTimeout(() => {
      res.send({
        code: 0,
        msg: "ok",
        data: [1, 2, 3]
      });
    }, 1000);
  }
};
