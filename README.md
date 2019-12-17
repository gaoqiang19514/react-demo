
## 清单

接入redux
  - [x] 关于redux中error变量的类型，string or bool? 怎么提取错误信息？
    1. 将isFetching置为false，不做其他处理
    2. 将error初始置为null(选择这个)，并且直接将catch中的错误参数整个传给error，总的来说error是个对象类型

  - [x] 确认在request success failure的情况下，state的处理是否正确
  - [x] 将搜索关键字移入redux，这么做的原因是在用户进入详情后返回，之前的结果维持的情况下，需要保证输入框的关键字还原，如果不用redux就会丢失

模拟请求
  - [x] 接入redux-thunk
  - [ ] 没数调用回车发起查询和无限滚动发起翻页加载的请求处理有差异
    回车查询要清空redux中的历史记录，翻页查询要保留历史记录，这里要做两个type来区分处理
    罗列差异：
    1 清空items
    2 重置scrolltop currPage

  - [ ] 响应还没回来，用户切换了路由，后续请求回来修改了redux

添加滚动翻页

