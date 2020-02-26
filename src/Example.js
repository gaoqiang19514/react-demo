import React, { Component } from "react";
import { Tree } from "antd";

const { TreeNode } = Tree;

class Example extends Component {
  state = {
    treeData: [
      { title: "Expand to load", key: "0" },
      { title: "Expand to load", key: "1" }
    ]
  };

  recursionTree = data => {
    return data.map(item => {
      if (item.children) {
        item.children = this.recursionTree(item.children);
      }
      return { ...item, title: `${item.title} + 1` };
    });
  };

  updateTree = () => {
    const newTree = this.recursionTree(this.state.treeData);
    console.log(newTree);
    this.setState({ treeData: newTree });
  };

  onLoadData = treeNode => {
    return new Promise(resolve => {
      if (treeNode.props.children) {
        resolve();
        return;
      }
      setTimeout(() => {
        treeNode.props.dataRef.children = [
          { title: "Child Node", key: `${treeNode.props.eventKey}-0` },
          { title: "Child Node", key: `${treeNode.props.eventKey}-1` }
        ];
        this.setState(
          {
            treeData: [...this.state.treeData]
          },
          this.updateTree
        );
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
