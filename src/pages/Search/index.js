import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import SearchComp from "../../components/Search";
import history from "../../service";
import { featchStarted, resetSearch } from "../../actions";

const Ul = styled.ul`
  li {
    padding: 30px;
  }
`;
const Loading = styled.div`
  padding: 30px;
  font-size: 20px;
  text-align: center;
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
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
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
      this.props.onFetch({
        searchText: this.state.searchText,
        currPage: currPage + 1
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
    this.props.onFetch({ searchText: this.state.searchText, currPage: 1 });
  }

  render() {
    const { items, isFetching } = this.props;
    const { searchText } = this.state;

    return (
      <div>
        <div>
          <SearchComp
            searchText={searchText}
            onChange={this.handleChnage}
            onCancel={this.handleCancel}
            onSubmit={this.handleSubmit}
          />
          <div>
            {!items.length && !!searchText.length && <div>搜索无结果</div>}
            <Ul>
              {items.map(item => {
                return <li key={item}>{item}</li>;
              })}
            </Ul>
            {isFetching && <Loading>loading...</Loading>}
          </div>
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
    }
  };
};

export default connect(mapStateToprops, mapDispatchToProps)(Search);
