import React, { Component } from "react";
import { connect } from "react-redux";

import SearchComp from "../../components/Search";
import history from "../../service";
import { featchStarted, resetSearch } from "../../actions";

class Search extends Component {
  constructor(props) {
    super(props);

    this.handleChnage = this.handleChnage.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      searchText: props.searchText
    };
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

    this.props.onFetch(this.state.searchText);
  }

  render() {
    const { items } = this.props;
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
            <ul>
              {items.map(item => {
                return <li key={item}>{item}</li>;
              })}
            </ul>
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
    onFetch: searchText => {
      dispatch(featchStarted(searchText));
    },
    onReset: () => {
      dispatch(resetSearch());
    }
  };
};

export default connect(mapStateToprops, mapDispatchToProps)(Search);
