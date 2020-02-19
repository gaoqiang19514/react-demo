## 点位图层的聚合实现
通过添加几个颜色图层，然后地图内部监听每个点位的children，也就是point_count进行匹配，
给不同数值的点位加上不同的颜色，治愈聚合效果，在配置cluster属性时，已经完成

1. 为什么初始执行了 addSource 和 addLayer，地图上没有显示点位？
   由于配置的问题，聚合的 type 为 symbol，常规的点位图层用的是 circle

2. 搞懂过滤器的使用方法
   删选数据源，仅显示通过删选的数据
   point_count 先当做是数据的 features 的 index

存在型
["!has", "point_count"]

比较型
[">=", "point_count", color[0]]
属性中对应 key 的值大于等于 color[0]

组合型
[
"all",
[">=", "point_count", color[0]],
["<", "point_count", outerColors[i - 1][0]]
]


##  "icon-image": "bank-15"这里是什么作用
