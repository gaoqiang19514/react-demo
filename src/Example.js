import "antd-mobile/dist/antd-mobile.css";
import React, { Component } from "react";
import { createForm } from "rc-form";

class Example extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.form.validateFields((error, value) => {
      if (!error) {
        console.log("ok", value);
      } else {
        console.log("error", error);
      }
    });
  }

  render() {
    const { getFieldProps, getFieldDecorator } = this.props.form;

    return (
      <div>
        <input
          type="text"
          {...getFieldProps("name", {
            initialValue: "",
            rules: [{ required: true }]
          })}
        />
        {getFieldDecorator("age", {
          initialValue: "",
          rules: [{ required: true }]
        })(<input type="text" />)}

        {getFieldDecorator("comment", {
          initialValue: "",
          rules: [{ required: true }]
        })(<textarea />)}
        <button type="button" onClick={this.handleSubmit}>
          submit
        </button>
      </div>
    );
  }
}

export default createForm()(Example);
