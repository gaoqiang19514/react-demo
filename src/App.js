import React from "react";
import styled from "styled-components";


// import TreeExample from "./components/TreeExample";
// import ListViewExample from "./components/ListViewExample";
// import TableExample from "./components/TableExample";
// import FormExample from "./components/FormExample";
// import TreeSelectExample from "./components/TreeSelectExample";
// import DatePickerExample from "./components/DatePickerExample";
// import RangePickerExample from "./components/RangePickerExample";
// import EditableTable from "./components/EditableTable";
// import CalendarDemo from "./components/CalendarDemo";
// import MultiLineTable from './components/MultiLineTable'

const PageContainer = styled.div`
  padding: 30px;
`;

function App() {
  const columns = [
    {
      title: "name",
      dataIndex: "name",
      width: "30%",
      editable: false,
    },
    {
      title: "age",
      dataIndex: "age",
      editable: false,
    },
    {
      title: "address",
      dataIndex: "address",
      editable: true,
    },
  ];

  const dataSource = [
    {
      key: "0",
      name: "Edward King 0",
      age: "32",
      address: "London, Park Lane no. 0",
    },
    {
      key: "1",
      name: "Edward King 1",
      age: "32",
      address: "London, Park Lane no. 1",
    },
  ];
  return (
    <PageContainer>
      {/* <EditableTable columns={columns} dataSource={dataSource} /> */}
      {/* <h2>禁用日期</h2> */}
      {/* <DatePickerExample /> */}
      {/* <h2>禁用日期和时间</h2> */}
      {/* <RangePickerExample /> */}
      {/* <h2>TreeSelectExample</h2> */}
      {/* <TreeSelectExample /> */}
      {/* <h2>FormExample</h2> */}
      {/* <FormExample /> */}
      {/* <h2>TableExample</h2> */}
      {/* <TableExample /> */}
      {/* <h2>ListViewExample</h2> */}
      {/* <ListViewExample /> */}
      {/* <h2>TreeExample</h2> */}
      {/* <TreeExample /> */}
      {/* <CalendarDemo /> */}
	  {/* <MultiLineTable /> */}
    </PageContainer>
  );
}

export default App;
