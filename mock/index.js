import { Random } from "mockjs";
import uuid from "uuid";

const createCount = start => {
  const arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push({
      id: uuid(),
      num: Number(start) * 10 + i,
      text: Random.paragraph(1, 5)
    });
  }
  return arr;
};

export default {
  "GET /user/:id": (req, res) => {
    const currPage = req.query.currPage;

    setTimeout(() => {
      res.send({
        code: 0,
        msg: "ok",
        data: createCount(currPage)
      });
    }, 2000);
  }
};
