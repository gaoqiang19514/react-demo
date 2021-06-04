/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Table, Popconfirm, Form, Radio, Rate, DatePicker } from "antd";
import moment from "moment";

import { EditableContext, components } from "./EditableCell";

const noop = () => {};

function getConfig({
  dataSource,
  editingKey,
  save = noop,
  cancel = noop,
  edit = noop,
  isEditing = noop,
}) {
  const columns = [
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "是否整改",
      dataIndex: "reform",
      editable: true,
      render: (value) => {
        if (value) {
          return "已整改";
        }

        return "未整改";
      },
      //   至于为什么要添加customRender，是由于render在内部执行了，只能拿到结果，无法控制渲染结果
      customRender: ({ record, dataIndex, form }) => {
        const { getFieldDecorator } = form;

        const options = [
          { label: "未整改", value: "0" },
          { label: "已整改", value: "1" },
        ];

        return getFieldDecorator("reform", {
          rules: [
            {
              required: true,
              message: "请选择",
            },
          ],
          initialValue: record[dataIndex],
        })(<Radio.Group options={options} />);
      },
    },
    {
      title: "整改状态",
      dataIndex: "situation",
      editable: true,
      render: (value, record) => {
        if (record.reform === "0") {
          return record.date.format("YYYY-MM-DD");
        }

        return <Rate value={record.rate} />;
      },
      customRender: ({ record, form }) => {
        const { getFieldDecorator, getFieldValue } = form;
        const reformStatus = getFieldValue("reform");

        if (reformStatus === "0") {
          return getFieldDecorator("date", {
            rules: [
              {
                required: true,
                message: "请输入",
              },
            ],
            initialValue: record["date"],
          })(<DatePicker />);
        }

        if (reformStatus === "1") {
          return getFieldDecorator("rate", {
            rules: [
              {
                required: true,
                message: "请输入",
              },
            ],
            initialValue: record["rate"],
          })(<Rate />);
        }
      },
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (text, record) => {
        const { key } = record;
        const editable = isEditing(key);
        return editable ? (
          <span>
            <EditableContext.Consumer>
              {(form) => (
                <a onClick={() => save(key, form)} style={{ marginRight: 8 }}>
                  保存
                </a>
              )}
            </EditableContext.Consumer>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ""} onClick={() => edit(key)}>
            修改
          </a>
        );
      },
    },
  ];

  const nextColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        title: col.title,
        dataIndex: col.dataIndex,
        customRender: col.customRender,
        editing: isEditing(record.key),
      }),
    };
  });

  return {
    components,
    dataSource,
    columns: nextColumns,
  };
}

function MultiLineTable(props) {
  const { form } = props;

  const [editingKey, setEditingKey] = useState("");
  const [dataSource, setDataSource] = useState([
    {
      key: "0",
      name: "Edrward 0",
      reform: "0",
      date: moment(),
      rate: 2,
    },
    {
      key: "1",
      name: "Edrward 1",
      reform: "1",
      date: moment(),
      rate: 2,
    },
  ]);

  const isEditing = (key) => key === editingKey;

  const edit = (key) => {
    setEditingKey(key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = (key, form) => {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }

      // 发送请求，成功后，同步state

      const dataSourceCopy = [...dataSource];
      const index = dataSourceCopy.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = dataSourceCopy[index];
        dataSourceCopy.splice(index, 1, {
          ...item,
          ...row,
        });
        setDataSource(dataSourceCopy);
      } else {
        dataSourceCopy.push(row);
        setDataSource(dataSourceCopy);
      }

      cancel();
    });
  };

  return (
    <EditableContext.Provider value={form}>
      <Table
        {...getConfig({
          editingKey,
          save,
          edit,
          cancel,
          isEditing,
          dataSource,
        })}
      />
    </EditableContext.Provider>
  );
}

export default Form.create()(MultiLineTable);
