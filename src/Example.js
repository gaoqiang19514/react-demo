// 无法中断循环
// - forEach
// - map
// - filter

// 可以被中断的循环，return直接结束循环
// - for

const tree1 = [
  {
    name: "tree1"
  }
];

// 修改了list中引用元素item中的值，也就修改了源数组list
function clone(list) {
  return list.map(item => {
    if (item.children) {
      item.children = clone(item.children);
    }
    // 修改了引用变量item中的值，item还是指向和list中元素一样的地址
    item.name = "tree2";
    return item;
  });
}

// 修改了list中引用元素item的指向
function clone2(list) {
  return list.map(item => {
    if (item.children) {
      item.children = clone(item.children);
    }
	// 修改了引用变量item的指向，也就是切断了和list中元素的联系
	// 所以这里修不修改name的值，他都与list中的item无关系了
    return {
      ...item,
      name: "tree2"
    };
  });
}

// 修改了list中引用元素item的指向
function clone3(list) {
  return list.map(item => {
    if (item.children) {
      item.children = clone(item.children);
    }
    // 修改了引用变量item的指向，也就是切断了和list中元素的联系
	// 所以这里修不修改name的值，他都与list中的item无关系了
	return {
      ...item
    };
  });
}

const tree2 = clone(tree1);

console.log(tree1, tree2);
