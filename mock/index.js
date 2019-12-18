export default {
  "GET /user/:id": (req, res) => {
    setTimeout(() => {
      res.send({
        code: 0,
        msg: "ok"
      });
    }, 2000);
  }
};
