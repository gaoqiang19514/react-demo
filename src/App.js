import React, { Component } from "react";
import { createForm } from "rc-form";

import "antd-mobile/dist/antd-mobile.css";

class Example extends Component {
  submit = () => {
    this.props.form.validateFields((error, value) => {
      if (!error) {
        // console.log("ok", value);
      } else {
        // console.log("error", error);
      }
    });

    console.log(this.props.form.getFieldsValue(['name', 'age']))
  };

  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <div>
        <input
          {...getFieldProps("name", {
            initialValue: "",
            rules: [{ required: true }]
          })}
        />
        <input
          {...getFieldProps("age", {
            initialValue: "",
            rules: [{ required: true }]
          })}
        />

        {(errors = getFieldError("required") ? errors.join(",") : null)}
        <button onClick={this.submit}>submit</button>
      </div>
    );
  }
}

const ExampleWrapper = createForm()(Example);

function App() {
  return (
    <div className="App">
      <ExampleWrapper />
    </div>
  );
}

export default App;
