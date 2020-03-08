import React, { Component } from "react";
import { Tree } from "antd";
import { cloneDeep } from "lodash";
import axios from "axios";

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

class TreeExample extends Component {
  constructor(props) {
    super(props);

    this.onLoadData = this.onLoadData.bind(this);

    this.state = {
      treeData: [{ title: "Expand to load 1", key: "1" }]
    };
  }

  onLoadData(treeNode) {
    return new Promise((resolve, reject) => {
      if (treeNode.props.children) {
        resolve();
        return;
      }

      // 正常相应和异常（服务器错误，返回格式错误，超时）都应该调用resolve
      axios
        .get("/getUsers", {
          timeout: 5000
        })
        .then(res => {
          console.log("res", res);
          resolve();
        })
        .catch(err => {
          console.error("err", err);
          resolve();
        });
    });
  }

  renderTreeNodes(data) {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode key={item.key} title={item.title} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={item.title} dataRef={item} />;
    });
  }

  render() {
    return (
      <Tree loadData={this.onLoadData}>
        {this.renderTreeNodes(this.state.treeData)}
      </Tree>
    );
  }
}

export default TreeExample;
