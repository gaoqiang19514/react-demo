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
    const node = {
      id: item.id,
      name: item.name
    };
    if (item.children) {
      arr.push(...test(item.children));
    }
    arr.push(node);
  });
  return arr;
}

const res = test(treeData);
console.log(res);

function App() {
  return (
    <div>
      <Example />
    </div>
  );
}

export default App;
