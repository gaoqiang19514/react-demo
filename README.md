# jest测试笔记


## 测试指南
https://segmentfault.com/a/1190000018063747


## 搞清楚CRA内置的jest和自己安装之间的差异
暂时没有发现差异，有可能是在使用enzyme的时候有差异，等待验证


## test文件怎么用文件夹来管理
将测试文件放到__tests__


## 关于Enzyme
Enzyme是用来测试React的库，也就是说，如果你只是测试一些js函数，不涉及react的话，只用jest就足够了


## Enzyme的安装
/src/setupTests.js
```
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```