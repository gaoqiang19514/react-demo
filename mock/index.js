import { Random } from "mockjs";
import uuid from "uuid";

/**
 * 生成指定页面的10条数据
 * @param {Number} page
 */
function createCount(page) {
  const arr = [];

  for (let i = 0; i < 10; i++) {
    arr.push({
      id: uuid(),
      num: page * 10 + i,
      text: Random.paragraph(1)
    });
  }
  return arr;
}

export default {
  "GET /user/:id": (req, res) => {
    const currPage = req.query.currPage;

    setTimeout(() => {
      res.send({
        code: 0,
        msg: "ok",
        data: createCount(Number(currPage))
      });
    }, 2000);
  }
};
