// let originArr = [1];
// let newArr = originArr;

// 修改引用中的值
// originArr[0] = 999;
// 修改originArr的地址
// originArr = [];
// console.log("originArr", originArr);
// console.log("newArr", newArr);

// --------------------------------------------------------

// let obj = {
//   children: []
// };

// let obj2 = obj;
// 这里就是修改了obj2的地址，并不是修改了引用指向的数据
// obj2 = null;
// console.log("obj, obj2", obj, obj2);

// const obj3 = obj;
// 由于children属于引用变量obj的值，所以这里相当于修改obj引用地址中的children地址值，
// 所以会影响到obj3
// obj3.children = null
// console.log("obj, obj3", obj, obj3);

// --------------------------------------------------------

let tree = [
  {
    level: 1,
    children: [{ level: 2 }]
  }
];

// let tree2 = tree;
// 修改tree引用地址指向的数据
// 所以同样指向tree引用地址的tree2会被影响到
// tree[0] = null
// console.log(tree, tree2);

const tree3 = [...tree];

// 修改数组tree3元素的children属性（引用修改）
tree3[0].children = null
console.log(tree , tree3)

// 修改数组tree3的元素（值修改？需要验证！！！！！）
tree3[0] = null
console.log(tree , tree3)
