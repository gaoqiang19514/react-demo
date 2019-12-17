import React, { Component } from "react";

import Search from "../../components/Search";
import history from "../../service";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.handleChnage = this.handleChnage.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      searchText: "",
      searchResultDataList: []
    };
  }

  handleChnage(e) {
    this.setState({ searchText: e.target.value });
  }

  handleCancel() {
    history.push("/home");
  }

  handleSubmit(e) {
    e.preventDefault();
    // 在这里发起搜索 获取结果 然后渲染到搜索的弹层里面
    setTimeout(() => {
      this.setState({ searchResultDataList: [1, 2, 3, 4, 5, 6] });
    }, 2000);
  }

  render() {
    const { searchText, searchResultDataList } = this.state;

    return (
      <div>
        <div>
          <Search
            searchText={searchText}
            onChange={this.handleChnage}
            onCancel={this.handleCancel}
            onSubmit={this.handleSubmit}
          />
          <div>
            {!searchResultDataList.length && !!searchText.length && (
              <div>搜索无结果</div>
            )}
            <ul>
              {searchResultDataList.map(item => {
                return <li key={item}>{item}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
