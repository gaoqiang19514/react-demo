export default {
  "GET /user": (req, res) => {
    setTimeout(() => {
      res.send({
        code: 0,
        data: {
          users: [{ id: 1, name: "tom", age: 30, key: req.query.key }],
        },
      });
    }, 1000);
  },
};
