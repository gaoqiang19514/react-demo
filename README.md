## 清单

接入 redux

- [x] 关于 redux 中 error 变量的类型，string or bool? 怎么提取错误信息？
  1. 将 isFetching 置为 false，不做其他处理
  2. 将 error 初始置为 null(选择这个)，并且直接将 catch 中的错误参数整个传给 error，总的来说 error 是个对象类型

- [x] 确认在 request success failure 的情况下，state 的处理是否正确
- [x] 将搜索关键字移入 redux，这么做的原因是在用户进入详情后返回，之前的结果维持的情况下，需要保证输入框的关键字还原，如果不用 redux 就会丢失

模拟请求

- [x] 接入 redux-thunk
- [x] 没数调用回车发起查询和无限滚动发起翻页加载的请求处理有差异
      回车查询要清空 redux 中的历史记录，翻页查询要保留历史记录，这里要做两个 type 来区分处理
      罗列差异：
      1 清空 items
      2 重置 scrolltop currPage

- [x] 响应还没回来，用户切换了路由，后续请求回来修改了 redux
    1. 离开组件时，取消异步操作 使用axios的cancel?(最终选择了这种方式)
    2. 到github上找找样板代码
    3. 每次从列表路由进入搜索路由时，重置redux
    4. 参照竞态问题的处理方式，不对接下来的响应处理，直接丢弃，判断条件呢？判断什么是离开？componentWillUnmount中添加丢弃标志？

- [ ] 竞态问题
    发送请求前，记录当前请求的id，在响应中对比当前id与之前记录的id是否一致

添加滚动翻页

- [x] 触发条件
    document.documentElement.offsetHeight <= (window.innerHeight + document.documentElement.scrollTop)
- [x] 请求中时，阻止后续的滚动触发
- [x] 记录滚动条高度
    添加详情页
    记录当前页面的高度 每次离开组件之前记录

- [x] 头部搜索框保持在顶部
 方法一：将头部绝对定位（更简单，所以选这个）
 方法二：在list容器中滚动

- [ ] 修改searchText时，去掉结果