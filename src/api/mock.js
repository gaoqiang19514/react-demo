import Mock from "mockjs";
import uuid from "uuid";

const LEN = 10;

Mock.setup({
  timeout: 2000
});

/**
 * 生成指定页面的10条数据
 * @param {Number} page
 */
function createData(page) {
  const arr = [];

  for (let i = 0; i < LEN; i++) {
    const id = uuid();
    arr.push({
      id: id,
      text: id
    });
  }

  return arr;
}

Mock.mock(/\/api\/getData/, options => ({
  code: 0,
  msg: "ok",
  data: createData()
}));
