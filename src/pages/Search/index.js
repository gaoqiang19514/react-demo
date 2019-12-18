import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

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

    this.handleScroll = this.handleScroll.bind(this);
    this.handleChnage = this.handleChnage.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      searchText: props.searchText
    };
  }

  componentDidMount() {
    const { scrollTop } = this.props;
    if (scrollTop) {
      document.documentElement.scrollTop = scrollTop;
    }
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    this.props.onSetScrollTop(document.documentElement.scrollTop || 0);

    // 在这里判断，如果不是去详情页，需要重置redux
    if (this.props.history.location.pathname !== "/detail") {
      this.props.onReset();
    }

    if (this.source) {
      console.log("come in");
      this.source.cancel("Operation canceled by the user.");
    }
  }

  handleScroll() {
    const { isFetching } = this.props;
    if (isFetching) {
      return;
    }
    if (
      document.documentElement.offsetHeight <=
      window.innerHeight + document.documentElement.scrollTop
    ) {
      const { currPage } = this.props;
      var CancelToken = axios.CancelToken;
      this.source = CancelToken.source();

      this.props.onFetch({
        searchText: this.state.searchText,
        currPage: currPage + 1,
        cancelToken: this.source.token
      });
    }
  }

  handleChnage(e) {
    this.setState({ searchText: e.target.value });
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
    var CancelToken = axios.CancelToken;
    this.source = CancelToken.source();
    this.props.onFetch({
      searchText: this.state.searchText,
      currPage: 1,
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
                  <Link key={item} to="/detail">
                    {item}
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
