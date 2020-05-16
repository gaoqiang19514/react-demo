import React from "react";
import styled from "styled-components";

import TreeExample from "./components/TreeExample";
import ListViewExample from "./components/ListViewExample";
import TableExample from "./components/TableExample";
import FormExample from "./components/FormExample";
import TreeSelectExample from "./components/TreeSelectExample";
import DatePickerExample from "./components/DatePickerExample";

const PageContainer = styled.div`
	margin: 30px;
`

function App() {
  return (
    <PageContainer>
      <h2>禁用部分时间</h2>
      <DatePickerExample />
      {/* <h2>TreeSelectExample</h2>
      <TreeSelectExample />
      <h2>FormExample</h2>
      <FormExample />
      <h2>TableExample</h2>
      <TableExample />
      <h2>ListViewExample</h2>
      <ListViewExample />
      <h2>TreeExample</h2>
      <TreeExample /> */}
    </PageContainer>
  );
}

export default App;
