
## 清单

接入redux
  - [ ] 关于redux中error变量的类型，string or bool? 怎么提取错误信息？
    1. 将isFetching置为false，不做其他处理
    2. 将error初始置为null(选择这个)，并且直接将catch中的错误参数整个传给error，总的来说error是个对象类型

  - [ ] 确认在request success failure的情况下，state的处理是否正确
