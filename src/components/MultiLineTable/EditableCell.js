import React from "react";
import { Form } from "antd";

export const EditableContext = React.createContext();

export const components = {
  body: {
    cell: EditableCell,
  },
};

function EditableCell(props) {
  const {
    editing,
    dataIndex,
    title,
    record,
    index,
    children,
    getOptions,
    customRender,
    ...restProps
  } = props;

  const renderCell = (form) => {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item>{customRender({ record, dataIndex, form })}</Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  return <EditableContext.Consumer>{renderCell}</EditableContext.Consumer>;
}

export default EditableCell;
