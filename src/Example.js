import React, { Component } from "react";

class Example extends Component {
  // 根据props的值来更新state 可以用来很好的替代componentWillReceiveProps
  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log("getDerivedStateFromProps", nextProps, prevState);
    // 这里可以拿state跟新的prop来进行比较 然后决定来更新state
    if (prevState.name !== nextProps.name) {
      return {
        name: nextProps.name
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      name: ""
    };
  }

  // 在dom实际渲染（didUpdate）之前render之后
  // 在didUpdate之前 可以访问dom 比如我们render后列表元素更新了 需要调整容器的高度 在这里就可以访读取到
  // 然后计算新的高度 返回给 componentDidUpdate 这样componentDidUpdate里面可以用这个计算出来的高度更新容器的高度
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate");
    return "tom";
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate", snapshot);
  }
  // 在componentWillReceiveProps里面可以根据组件接收的props变化 更新组件内部的state
  // 也可在此函数内根据prop的变化 调用自定义函数 比如之前养犬大屏父组件传入子组件的数据 需要重新绘制页面元素 在这里就可以做到
  // componentWillReceiveProps(nextProps) {
  //   console.log(
  //     "componentWillReceiveProps",
  //     this.props.data === nextProps.data
  //   );
  //   // if (this.props.data.name !== nextProps.data.name) {
  //   //   if (nextProps.data.name === "tom") {
  //   //     this.setState({ sex: "male" });
  //   //   } else if (nextProps.data.name === "lina") {
  //   //     this.setState({ sex: "female" });
  //   //   }
  //   // }
  // }

  render() {
    const { name } = this.state;
    console.log("render");

    return <div>{name}</div>;
  }
}

export default Example;
