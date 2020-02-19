## 怎么处理catch到的错误？
当错误发生时，javascript引擎会就此结束执行，并生成一个错误信息。


## 为什么要处理异常
https://www.cnblogs.com/huangfenggu/p/4503803.html
方便后续错误的定位和修复

使用 try-catch 最适合处理那些我们无法控制的错误。假设你在使用一个大型 JavaScript 库中的
函数，该函数可能会有意无意地抛出一些错误。由于我们不能修改这个库的源代码，所以大可将对该函
数的调用放在 try-catch 语句当中，万一有什么错误发生，也好恰当地处理它们。

在明明白白地知道自己的代码会发生错误时，再使用 try-catch 语句就不太合适了。例如，如果
传递给函数的参数是字符串而非数值，就会造成函数出错，那么就应该先检查参数的类型，然后再决定
如何去做。在这种情况下，不应用使用 try-catch 语句。

## 错误处理示例
```
function process(values) {
  if (!(values instanceof Array)) {
    throw new Error("process(): Argument must be an array.");
  }
  
  values.sort();

  for (var i = 0, len = values.length; i < len; i++) {
    if (values[i] > 100) {
      return values[i];
    }
  }

  return -1;
}
```

下面这里不捕获错误的话，在遍历到没有reverse方法的项目时，程序会崩溃，
但是有了异常处理则不会，并且会顺利的完成遍历
```
function traverse(items) {
  for (let i = 0, len = items.length; i < len; i++) {
    try {
      items[i].reverse(i);
    } catch (err) {
      console.log("捕获了错误");
    }
  }
}

const print = val => console.log(val);

traverse([
  {
    reverse: print
  },
  { reverse: 29 },
  {
    reverse: print
  }
]);

```


## 记忆点
- 异常如果在`catch`之前被其他异常节点处理，后面的`catch`就不会执行了
- `catch`后面可以接`then`，并且`catch`的内部函数返回值会作为下一个`then`内部函数的参数

