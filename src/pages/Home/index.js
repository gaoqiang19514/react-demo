import React, { Component } from "react";
import styled from "styled-components";

import history from "../../service";

const SearchInput = styled.div`
  padding: 5px 10px;
  margin: 10px;
  border: 1px solid #ccc;
`;

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    history.push("/search");
  }

  render() {
    return (
      <div>
        <header>
          <h1>header</h1>
          <SearchInput onClick={this.handleClick}>搜索</SearchInput>
        </header>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>
    );
  }
}
