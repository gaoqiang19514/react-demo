import React from "react";

import Example from "./Example";
import "./copy_array";

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
        children: [
          { level: 3, count: 10 },
          { level: 3, count: 21 }
        ]
      },
      {
        level: 2,
        count: 12,
        children: [{ level: 3, count: 10 }]
      }
    ]
  }
];

function rewriteCount(data) {
  return data.map(item => {
    const node = { count: item.count, level: item.level };

    if (item.children) {
      node.children = rewriteCount(item.children);
      node.count = node.children.reduce((total, item) => total + item.count, 0);
    }

    return node;
  });
}

const res2 = rewriteCount(tree);

function App() {
  return (
    <div>
      <Example />
    </div>
  );
}

export default App;
