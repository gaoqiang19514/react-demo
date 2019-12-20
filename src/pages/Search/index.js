import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CancelToken } from "axios";
import { throttle } from "lodash";

import SearchComp from "../../components/Search";
import history from "../../service";
import { featchStarted, resetSearch, setScrollTop } from "../../actions";

const List = styled.div`
  a {
    display: block;
    padding: 30px;
  }
`;
const Loading = styled.div`
  padding: 30px;
  font-size: 20px;
  text-align: center;
`;
const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: #ccc;
`;
const Main = styled.div`
  padding-top: 50px;
`;

class Search extends Component {
  constructor(props) {
    super(props);

    this.handleScroll = throttle(this.handleScroll.bind(this), 300);
    this.handleChnage = this.handleChnage.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleThrottleChange = throttle(this.handleThrottleChange, 500);

    this.state = {
      searchText: props.searchText
    };
  }

  componentDidMount() {
    const { scrollTop } = this.props;
    if (scrollTop) {
      document.documentElement.scrollTop = scrollTop;
    }
    window.addEventListener("scroll", this.handleScroll, 300);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    this.props.onSetScrollTop(document.documentElement.scrollTop || 0);
    
    // 在这里判断，如果不是去详情页，需要重置redux
    if (this.props.history.location.pathname !== "/detail") {
      this.props.onReset();
    }

    // 组件销毁时取消未完成的异步请求
    if (this.source) {
      this.source.cancel("Operation canceled by the user.");
    }
  }

  handleScroll() {
    const { isFetching } = this.props;
    if (isFetching) {
      return;
    }
    debugger
    console.log(
      document.documentElement.offsetHeight,
      window.innerHeight + document.documentElement.scrollTop
    );
    if (
      document.documentElement.offsetHeight <=
      window.innerHeight + document.documentElement.scrollTop
    ) {
      const { currPage } = this.props;
      this.source = CancelToken.source();
      console.log("发起请求");
      this.props.onFetch({
        searchText: this.state.searchText,
        currPage: currPage + 1,
        cancelToken: this.source.token
      });
    }
  }

  handleChnage(e) {
    const value = e.target.value;
    this.setState({ searchText: value }, () => {
      this.handleThrottleChange(value);
    });
  }

  handleThrottleChange(value) {
    this.props.onReset();
    this.source = CancelToken.source();
    this.props.onFetch({
      searchText: this.state.searchText,
      currPage: 0,
      cancelToken: this.source.token
    });
  }

  handleCancel() {
    history.push("/home");
    // 这里要重置redux
    this.props.onReset();
  }

  handleSubmit(e) {
    e.preventDefault();
    // 在这里发起搜索 获取结果 然后渲染到搜索的弹层里面
    this.props.onReset();
    this.source = CancelToken.source();
    this.props.onFetch({
      searchText: this.state.searchText,
      currPage: 0,
      cancelToken: this.source.token
    });
  }

  render() {
    const { items, isFetching } = this.props;
    const { searchText } = this.state;

    return (
      <div>
        <div>
          <Header>
            <SearchComp
              searchText={searchText}
              onChange={this.handleChnage}
              onCancel={this.handleCancel}
              onSubmit={this.handleSubmit}
            />
          </Header>
          <Main>
            {!items.length && !!searchText.length && <div>搜索无结果</div>}
            <List>
              {items.map(item => {
                return (
                  <Link key={item.id} to="/detail">
                    {item.text}
                  </Link>
                );
              })}
            </List>
            {isFetching && <Loading>loading...</Loading>}
          </Main>
        </div>
      </div>
    );
  }
}

const mapStateToprops = state => {
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetch: params => {
      dispatch(featchStarted(params));
    },
    onReset: () => {
      dispatch(resetSearch());
    },
    onSetScrollTop: scrollTop => {
      dispatch(setScrollTop(scrollTop));
    }
  };
};

export default connect(mapStateToprops, mapDispatchToProps)(Search);
