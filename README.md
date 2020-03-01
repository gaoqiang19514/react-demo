## 讲解useEffect
https://zhuanlan.zhihu.com/p/65773322

## 讲解useCallback/useMemo/React.memo
https://segmentfault.com/a/1190000021062986

## useCallback/useMemo/React.memo
useCallback返回缓存的函数
useMemo返回缓存的变量
React.memo根据函数组件的props是否更新来觉得是否render

useCallback
缓存函数

useMemo
减少计算量，缓存变量

React.memo
减少函数组件的render


## useEffect/componentDidMount + componentWillUnmount
注意为了只在初始化和组件卸载时执行，需要指定useEffect的依赖为空数组，
因为如果不指定依赖为空数组，那么会在组件每次渲染后都执行
```
	function resize() {
		// do something ...
	}

	useEffect(() => {
		window.addEvenetListener('resize', resize)
		return () => {
			window.removeEvenetListener('resize', resize)
		}
	}, []);
```