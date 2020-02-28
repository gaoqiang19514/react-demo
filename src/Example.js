import React, { Component } from "react";
import { Tree } from "antd";
import { cloneDeep } from "lodash";

const { TreeNode } = Tree;

class Example extends Component {
  state = {
    treeData: [
      { title: "Expand to load 0", key: "0" },
      { title: "Expand to load 1", key: "1" }
    ],
    newTreeData: [
      { title: "Expand to load 0", key: "0" },
      { title: "Expand to load 1", key: "1" }
    ]
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
        this.updateTreeByKey(
          treeNode.props.dataRef.key,
          [
            { title: "Child Node", key: `${treeNode.props.eventKey}-0` },
            { title: "Child Node", key: `${treeNode.props.eventKey}-1` }
          ],
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
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} dataRef={item} />;
    });
  };

  render() {
    const newTreeData = cloneDeep(this.state.treeData);
    // console.log(this.state.treeData);
    return (
      <Tree loadData={this.onLoadData}>
        {this.renderTreeNodes(newTreeData)}
      </Tree>
    );
  }
}

export default Example;
