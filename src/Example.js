import React, { Component } from "react";
import { Tree } from "antd";
import { cloneDeep } from "lodash";

const { TreeNode } = Tree;

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

  // 更新节点数据
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

export default Example;
