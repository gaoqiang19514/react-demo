import React from "react";

import TreeExample from "./components/TreeExample";
import ListViewExample from "./components/ListViewExample";
import TableExample from "./components/TableExample";
import FormExample from "./components/FormExample";
import TreeSelectExample from "./components/TreeSelectExample";
import DatePickerExample from "./components/DatePickerExample";

function App() {
  return (
    <div>
      <h2>禁用部分时间</h2>
      <DatePickerExample />
      <h2>TreeSelectExample</h2>
      <TreeSelectExample />
      <h2>FormExample</h2>
      <FormExample />
      <h2>TableExample</h2>
      <TableExample />
      <h2>ListViewExample</h2>
      <ListViewExample />
      <h2>TreeExample</h2>
      <TreeExample />
    </div>
  );
}

export default App;
