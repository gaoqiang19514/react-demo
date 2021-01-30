import React from "react";
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
import shortid from "shortid";

import "./style.css";
import { size } from "lodash";

BScroll.use(Pullup);

let count = 0;
const maxCount = 3;
function generateData() {
  count = count + 1;

  if (count >= maxCount) {
    return [];
  }

  return [shortid(), shortid(), shortid(), shortid(), shortid()];
}

const Api = {
  get: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateData());
      }, 1000);
    });
  },
};

function Block({ id }) {
  return (
    <div className="item" style={{ padding: "40px 30px" }}>
      {id}
    </div>
  );
}

class SimpleExample extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;
    this.bscroll = null;

    this.state = {
      isPullUpLoad: false,
      hasMore: true,
      data: [],
    };
  }

  componentDidMount() {
    this.initBScroll();
  }

  initBScroll = () => {
    this.bscroll = new BScroll(this.ref, {
      pullUpLoad: true,
    });

    this.bscroll.on("pullingUp", this.pullingUpHandler);

    this.bscroll.autoPullUpLoad();
  };

  pullingUpHandler = async () => {
    this.setState({
      isPullUpLoad: true,
    });

    await this.requestData();
  };

  async requestData() {
    const { data } = this.state;

    try {
      const newData = await Api.get();

      if (size(newData)) {
        this.setState({ data: [...data, ...newData] }, () => {
          this.bscroll.finishPullUp();
          this.bscroll.refresh();

          this.setState({
            isPullUpLoad: false,
          });
        });
      } else {
        this.setState({ hasMore: false });
      }
    } catch (err) {
      console.log(err);
    }
  }

  renderItems = () => {
    const { data } = this.state;

    return data.map((id) => <Block key={id} id={id} />);
  };

  renderTips = () => {
    const { isPullUpLoad, hasMore } = this.state;

    if (!hasMore) {
      return (
        <div className="pullup-tips">
          <div className="after-trigger">
            <span className="pullup-txt">没有更多了</span>
          </div>
        </div>
      );
    }

    if (isPullUpLoad) {
      return (
        <div className="pullup-tips">
          <div className="after-trigger">
            <span className="pullup-txt">加载中...</span>
          </div>
        </div>
      );
    }

    return (
      <div className="pullup-tips">
        <div className="before-trigger">
          <span className="pullup-txt">上拉加载更多</span>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="container">
        <div
          className="wrapper"
          ref={(ref) => {
            this.ref = ref;
          }}
        >
          <div className="content">
            {this.renderItems()}
            {this.renderTips()}
          </div>
        </div>
      </div>
    );
  }
}

export default SimpleExample;
