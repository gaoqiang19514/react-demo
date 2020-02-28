import React, { Component } from "react";
import { Tree } from "antd";
import { cloneDeep } from "lodash";

const { TreeNode } = Tree;

const MAX_COUNTTER = 2;
let counter = 0;

function hasCount(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].count) {
      return true;
    }
  }
  return false;
}

class Example extends Component {
  state = {
    treeData: [{ title: "Expand to load 1", key: "1", count: 0 }]
  };

  updateTreeByKey = (key, data, oldData) => {
    oldData.forEach(item => {
      if (item.children) {
        this.updateTreeByKey(key, data, item.children);
      }
      if (item.key === key) {
        item.children = data;
      }
    });
  };

  onLoadData = treeNode => {
    return new Promise(resolve => {
      if (treeNode.props.children) {
        resolve();
        return;
      }
      setTimeout(() => {
        // 通过dataRef可以拿到当前节点在state中的数据引用
        // 那如果我将克隆后的state用来渲染，是不是会切断这里和state的联系呢？ 结论：确实会切断

        // 通过treeNode.props.dataRef得到当前点击的key，然后用key我就知道更新哪个节点了

        let newData = [
          {
            title: "Child Node",
            key: `${treeNode.props.eventKey}-0`,
            count: 10
          },
          {
            title: "Child Node",
            key: `${treeNode.props.eventKey}-1`,
            count: 20
          }
        ];

        if (counter >= MAX_COUNTTER) {
          newData = [
            {
              title: "Child Node",
              key: `${treeNode.props.eventKey}-0`
            },
            {
              title: "Child Node",
              key: `${treeNode.props.eventKey}-1`
            }
          ];
        }

        counter++;
        // console.log("后台返回的数据", newData);
        this.updateTreeByKey(
          treeNode.props.dataRef.key,
          newData,
          this.state.treeData
        );

        this.setState({
          treeData: [...this.state.treeData]
        });
        resolve();
      }, 1000);
    });
  };

  renderTreeNodes = data => {
    return data.map(item => {
      let title = item.title;
      const count = item.count ? `count: ${item.count}` : "";
      title = `${title} ${count}`;

      if (item.children) {
        return (
          <TreeNode title={title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} title={title} dataRef={item} />;
    });
  };

  updteCountNode = data => {
    return data.map(item => {
      const node = { ...item };

      if (item.children) {
        node.children = this.updteCountNode(item.children);
        if (hasCount(node.children)) {
          node.count = node.children.reduce((total, item) => {
            return total + item.count || 0;
          }, 0);
        }
      }

      return node;
    });
  };

  render() {
    const newTreeData = cloneDeep(this.state.treeData);
    const superTreeData = this.updteCountNode(newTreeData);

    // console.log(this.state.treeData, superTreeData);

    return (
      <Tree loadData={this.onLoadData}>
        {this.renderTreeNodes(superTreeData)}
      </Tree>
    );
  }
}

const obj = [
  {
    name: "tom",
    age: 30,
    children: [
      {
        name: "lina",
        age: 20
      }
    ]
  }
];

function clone(list) {
  return list.map(item => {
    console.log("item", item);
    const node = { ...item };
    if (node.children) {
      // 传了个引用进去
      node.children = clone(node.children);
    }

    return node;
  });
}

// const newObj = clone(obj);
// obj[0].children[0].age = 10000;
// console.log(obj[0].children === newObj[0].children);
// console.log(newObj);

const tom = [{ level: 1, children: [{ level: 2 }] }];
function copy(list) {
  return list.map(item => {
    if (item.children) {
      item.children = copy(item.children);
    }
    // 问题原来出在这里，应为item本身就是一个引用类型，这里将item的引用原封不动拷贝给了cat
	// 这样需要创建一个新的元素引用
	// 注意这里只是修改了item的引用，但是item内部的children引用并没有被修改
    return { ...item };
  });
}
const cat = copy(tom);

// 证明map返回的数组并非tom的引用，而是一个新的引用
// console.log("tom === cat", tom === cat);

// children被浅拷贝了
cat[0].children[0] = [];
// console.log(tom);

const go = {
  level: 1,
  children: [1]
};

const go2 = { ...go };
// console.log("go2", go2);
go2.children = [99999];
// console.log("go", go);

const object = {
  name: "tom",
  children: [999]
};
// 搞清楚下面两种赋值是很有意义的
// 第二种给object3开辟了新的引用，并且有name和children属性
// 这时object3的children属性虽然是指向object的children，但是我们修改了object3
// 的children指向后，就和ojbecjt的children没关系了，因为我们修改了他的指针
const object3 = { ...object };
object3.children = []
// console.log('object', object)
// console.log('object3', object3)



export default Example;
