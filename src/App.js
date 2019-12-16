import React, { Component } from "react";
import styled from "styled-components";

import Search from "./components/Search";

const FixedWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
`;

const Content = styled.div``;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.handleChnage = this.handleChnage.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      searchText: "",
      showCancelBtnFlag: false,
      searchResultDataList: []
    };
  }

  handleChnage(e) {
    this.setState({ searchText: e.target.value });
  }

  handleFocus() {
    this.setState({ showCancelBtnFlag: true });
  }

  handleCancel() {
    this.setState({
      showCancelBtnFlag: false,
      searchText: "",
      searchResultDataList: []
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // 在这里发起搜索 获取结果 然后渲染到搜索的弹层里面
    setTimeout(() => {
      this.setState({ searchResultDataList: [1, 2, 3, 4, 5, 6] });
    }, 2000);
  }

  render() {
    const { searchText, showCancelBtnFlag, searchResultDataList } = this.state;

    return (
      <div>
        <header>
          <h1>header</h1>
          <input
            type="text"
            placeholder="搜索"
            value=""
            onChange={() => {}}
            onFocus={this.handleFocus}
          />
        </header>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
        {showCancelBtnFlag && (
          <FixedWrap>
            <Search
              searchText={searchText}
              showCancelBtnFlag={showCancelBtnFlag}
              onChange={this.handleChnage}
              onFocus={this.handleFocus}
              onCancel={this.handleCancel}
              onSubmit={this.handleSubmit}
            />
            <Content>
              {!searchResultDataList.length && !!searchText.length && (
                <div>搜索无结果</div>
              )}
              <ul>
                {searchResultDataList.map(item => {
                  return <li key={item}>{item}</li>;
                })}
              </ul>
            </Content>
          </FixedWrap>
        )}
      </div>
    );
  }
}
