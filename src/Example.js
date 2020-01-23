import React, { Component } from "react";
import { createForm } from "rc-form";
import "antd-mobile/dist/antd-mobile.css";

class Example extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.form.validateFields((error, value) => {
      console.log(value);
      if (!error) {
        // console.log("ok", value);
      } else {
        // console.log("error", error);
      }
    });

    // console.log("pass", this.props.form.getFieldsValue(["name", "age"]));
  }

  render() {
    const { getFieldProps, getFieldDecorator } = this.props.form;

    return (
      <div>
        <input
          type="text"
          {...getFieldProps("name", {
            initialValue: ""
          })}
        />
        {getFieldDecorator("age", { initialValue: "" })(<input type="text" />)}

        <button type="button" onClick={this.handleSubmit}>
          submit
        </button>
      </div>
    );
  }
}

export default createForm()(Example);
