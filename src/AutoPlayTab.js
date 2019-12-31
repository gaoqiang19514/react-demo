import React, { Component } from "react";

export default class AutoPlayTab extends Component {
  constructor(props) {
    super(props);

    this.play = this.play.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.source = [];

    this.state = {
      tabIndex: 0,
      tabList: []
    };
  }

  componentDidMount() {
    this.play();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tabList !== this.props.tabList) {
      console.log("componentDidUpdate");
      this.source = [...this.props.tabList];
    }
  }

  handleMouseEnter() {
    clearTimeout(this.timer);
  }

  handleMouseLeave() {
    this.play();
  }

  play() {
    const intervalFunc = () => {
      this.doSomething();

      this.timer = setTimeout(intervalFunc, 1000);
    };

    this.timer = setTimeout(intervalFunc, 1000);
  }

  doSomething() {
    const index = this.state.tabList.pop();
    if (index) {
      console.log(index);
    } else {
      console.log("reset");
      this.reset();
    }
  }

  reset() {
    this.setState({
      tabList: [...this.source]
    });
  }

  render() {
    return null;
  }
}

// class AutoPlay {
//     constructor() {
//         this.timer = null;
//         this.dataList = [];
//         this.source = [...this.dataList];
//     }

//     play() {
//         this.doSomething();

//         this.timer = setTimeout(this.play, 1000);
//     }

//     stop() {
//         clearTimeout(this.timer);
//     }

//     doSomething() {
//         const item = this.dataList.pop();

//         // 判断一轮数据的播放是否完成 完成则重置
//         if (item) {
//             this.dispatchAction(item);
//         } else {
//             // 重新来过
//             this.reset();
//         }
//     }

//     reset() {
//         this.dataList = [...this.source];
//     }
// }
