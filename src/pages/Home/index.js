import React from "react";
import styled from "styled-components";

import history from "@/services/history";

const SearchInput = styled.div`
  padding: 5px 10px;
  margin: 10px;
  border: 1px solid #ccc;
`;

const handleClick = () => {
  history.push("/search");
};

function Home() {
  return (
    <div>
      <header>
        <h1>header</h1>
        <SearchInput onClick={handleClick}>搜索</SearchInput>
      </header>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default Home;
