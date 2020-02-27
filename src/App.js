import React from "react";

import Example from "./Example";

const treeData = [
  {
    id: 1,
    name: "tom",
    children: [
      {
        id: 2,
        name: "lina",
        num: 10,
        children: [
          {
            id: 4,
            name: "lily"
          },
          {
            id: 5,
            name: "lily"
          }
        ]
      },
      {
        id: 3,
        name: "zhou"
      }
    ]
  }
];

// 从叶子开始向上遍历树
function test(data) {
  let arr = [];
  data.forEach(item => {
    if (item.children) {
      arr = test(item.children);
    }

    arr.push({ id: item.id });
  });

  return arr;
}

const res = test(treeData);

const tree = [
  {
    level: 1,
    count: 0,
    children: [
      {
        level: 2,
        count: 12,
        children: [{ level: 3, count: 10 }]
      },
      {
        level: 2,
        count: 1,
        children: [{ level: 3, count: 10 }]
      },
      {
        level: 2,
        count: 12,
        children: [
          { level: 3, count: 110 },
          { level: 3, count: 90 }
        ]
      },
      {
        level: 2,
        count: 1,
        children: [{ level: 3, count: 10 }]
      },
      {
        level: 2,
        count: 1,
        children: [{ level: 3, count: 0 }]
      }
    ]
  }
];

function rewriteCount(data) {
  return data.map(item => {
    if (item.children) {
      rewriteCount(item.children);
      item.count = item.children.reduce((total, item) => total + item.count, 0);
    }
    return item;
  });
}

const res2 = rewriteCount(tree);
// console.log(res2);

function App() {
  return (
    <div>
      <Example />
    </div>
  );
}

export default App;
