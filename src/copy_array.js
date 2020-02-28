let originArr = [1];
let newArr = originArr;

console.log(originArr, newArr);

// 修改引用中的值
newArr[0] = 999;
// 修改引用本身
newArr = [];
console.log("originArr", originArr);
console.log("newArr", newArr);
