import React, { Component } from "react";
import { Table, Button } from "antd";
import styled from "styled-components";

const BtnBox = styled.div`
  button {
    margin-right: 8px;
    margin-bottom: 12px;
  }
`;

function sortDate(curr, next) {
  try {
    curr = new Date(curr);
    next = new Date(next);

    return curr.getTime() - next.getTime();
  } catch (err) {
    return 0;
  }
}

// 数据源
const dataSource = [
  {
    key: "1",
    column1: "19110105",
    column2: "自然小课堂-科普观影",
    column3: "美丽深圳志愿者",
    column4: "20/0",
    column5: "正常",
    column6: "审核通过",
    column7: "2016-09-20 08:50:08",
    column8: "2016-09-20 08:50:08",
    column9: "编辑 删除 归档"
  },
  {
    key: "2",
    column1: "19110106",
    column2: "自然小课堂-科普观影",
    column3: "美丽深圳志愿者",
    column4: "20/0",
    column5: "正常",
    column6: "审核通过",
    column7: "2016-09-21 08:50:08",
    column8: "2016-09-21 08:50:08",
    column9: "编辑 删除 归档"
  },
  {
    key: "3",
    column1: "19110106",
    column2: "自然小课堂-科普观影",
    column3: "美丽深圳志愿者",
    column4: "20/0",
    column5: "正常",
    column6: "审核通过",
    column7: "2016-09-21 08:50:08",
    column8: "2016-09-21 08:50:08",
    column9: "编辑 删除 归档"
  },
  {
    key: "4",
    column1: "19110106",
    column2: "自然小课堂-科普观影",
    column3: "美丽深圳志愿者",
    column4: "20/0",
    column5: "正常",
    column6: "审核通过",
    column7: "2016-09-21 08:50:08",
    column8: "2016-09-21 08:50:08",
    column9: "编辑 删除 归档"
  },
  {
    key: "5",
    column1: "19110106",
    column2: "自然小课堂-科普观影",
    column3: "美丽深圳志愿者",
    column4: "20/0",
    column5: "正常",
    column6: "审核通过",
    column7: "2016-09-21 08:50:08",
    column8: "2016-09-21 08:50:08",
    column9: "编辑 删除 归档"
  },
  {
    key: "6",
    column1: "19110106",
    column2: "自然小课堂-科普观影",
    column3: "美丽深圳志愿者",
    column4: "20/0",
    column5: "正常",
    column6: "审核通过",
    column7: "2016-09-21 08:50:08",
    column8: "2016-09-21 08:50:08",
    column9: "编辑 删除 归档"
  },
  {
    key: "7",
    column1: "19110106",
    column2: "自然小课堂-科普观影",
    column3: "美丽深圳志愿者",
    column4: "20/0",
    column5: "正常",
    column6: "审核通过",
    column7: "2016-09-21 08:50:08",
    column8: "2016-09-21 08:50:08",
    column9: "编辑 删除 归档"
  },
  {
    key: "8",
    column1: "19110106",
    column2: "自然小课堂-科普观影",
    column3: "美丽深圳志愿者",
    column4: "20/0",
    column5: "正常",
    column6: "审核通过",
    column7: "2016-09-21 08:50:08",
    column8: "2016-09-21 08:50:08",
    column9: "编辑 删除 归档"
  }
];

// 类目设置
const columns = [
  {
    key: "column1",
    title: "活动ID",
    dataIndex: "column1",
    width: 100
  },
  {
    title: "活动标题",
    dataIndex: "column2",
    key: "column2",
    width: 100
  },
  {
    title: "发起组织",
    dataIndex: "column3",
    key: "column3",
    width: 100
  },
  {
    title: "招募人数/报名人数",
    dataIndex: "column4",
    key: "column4",
    width: 120
  },
  {
    title: "项目状态",
    dataIndex: "column5",
    key: "column5",
    width: 100
  },
  {
    title: "审核状态",
    dataIndex: "column6",
    key: "column6",
    width: 100
  },
  {
    title: "活动开始时间",
    dataIndex: "column7",
    key: "column7",
    width: 120,
    sorter: (curr, next) => sortDate(curr.column7, next.column7)
  },
  {
    title: "活动结束时间",
    dataIndex: "column8",
    key: "column8",
    width: 120,
    sorter: (curr, next) => sortDate(curr.column8, next.column8)
  },
  {
    title: "操作",
    dataIndex: "column9",
    key: "column9",
    // 固定列
    fixed: "right",
    // 固定列需要配合width 否则会出现错位问题
    width: 250,
    render: () => (
      <BtnBox>
        <Button type="primary">编辑</Button>
        <Button type="primary">删除</Button>
        <Button type="primary">存档</Button>
      </BtnBox>
    )
  }
];

export default class TableExample extends Component {
  render() {
    return (
      <div style={{ padding: 20 }}>
        <Table
          tableLayout="auto"
          //   设置容器的高度 让内容在这个高度中纵向滚动
          scroll={{ x: 1400, y: 400 }}
          columns={columns}
          dataSource={dataSource}
        />
      </div>
    );
  }
}
