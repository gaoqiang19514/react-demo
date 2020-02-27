function func(n) {
  if (1 === n) {
    return n;
  }

  return n + func(n - 1);
}

func(3); // 6

const tree = [
  {
    level: 1,
    children: [
      {
        level: 2,
        children: [{ level: 3 }, { level: 3 }]
      },
      {
        level: 2
      }
    ]
  }
];

// 使用新数组保存递归结果
function recursion(arr) {
  const temp = [];

  arr.forEach(item => {
    const node = { ...item, level: item.level * 10 };

    if (item.children) {
      node.children = recursion(item.children);
    }

    temp.push(node);
  });

  return temp;
}

// 错误示例
function recursion2(arr) {
  return arr.map(item => {
    if (item.children) {
      recursion2(item.children);
      //   level为3的递归返回了一个数组，里面是level+10的值，
      //   但是我们没有将其保存，所以，该程序只会得到一个lvevl为1 + 10的值。
    }
    return { ...item, level: item.level + 10 };
  });
}

// 优化方法
function recursion3(arr) {
  return arr.map(item => {
    const node = { ...item, level: item.level * 10 };

    if (item.children) {
      node.children = recursion3(item.children);
    }

    return node;
  });
}

// 收集属性值
function getData(data) {
  let res = [];
  data.forEach(item => {
    if (item.children) {
      res = getData(item.children);
    }
    if (item.level) {
      res.push(item.level);
    }
  });
  return res;
}

// 目的：
// 复制结构
// const res = recursion(tree);

// 目的：
// 复制结构
// const res2 = recursion2(tree);

// 目的：
// 递归复制树结构
// const res3 = recursion3(tree);

const res = getData(tree);
console.log(res);
