import React, { Component } from "react";
import { Tree } from "antd";

const { TreeNode } = Tree;

class Example extends Component {
  state = {
    treeData: [
      { title: "Expand to load 0", key: "0" },
      { title: "Expand to load 1", key: "1" }
    ]
  };

  onLoadData = treeNode => {
    return new Promise(resolve => {
      if (treeNode.props.children) {
        resolve();
        return;
      }
      setTimeout(() => {
        // 通过dataRef可以拿到当前节点在state中的数据引用
        treeNode.props.dataRef.children = [
          { title: "Child Node", key: `${treeNode.props.eventKey}-0` },
          { title: "Child Node", key: `${treeNode.props.eventKey}-1` }
        ];
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
    return (
      <Tree loadData={this.onLoadData}>
        {this.renderTreeNodes(this.state.treeData)}
      </Tree>
    );
  }
}

export default Example;
