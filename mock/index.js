export default {
  "GET /user": (req, res) => {
    const interval = Math.random() * 10 * 1000;

    setTimeout(() => {
      res.send({
        code: 0,
        data: {
          users: [{ id: 1, name: "tom", age: 30, interval }],
        },
      });
    }, interval);
  },
};
