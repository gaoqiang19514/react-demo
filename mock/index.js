export default {
  "GET /api/getUsername": (req, res) => {
    const delay = Math.random() * 1000;

    setTimeout(() => {
      res.send({
        code: 0,
        msg: "ok",
        data: {
          name: `delay: ${delay}`,
          age: 30,
        },
      });
    }, delay);
  },
};
