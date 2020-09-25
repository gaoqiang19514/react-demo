import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";

const columns = [
  {
    title: "序号",
    dataIndex: "serial",
  },
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "数量",
    dataIndex: "count",
  },
];

const propTypes = {
  dataSource: PropTypes.array,
};

const defaultProps = {
  dataSource: [],
};

function Display(props) {
  const { dataSource } = props;

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={{ defaultPageSize: 1000, hideOnSinglePage: true }}
    />
  );
}

Display.propTypes = propTypes;
Display.defaultProps = defaultProps;

export default Display;
