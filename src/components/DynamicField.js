import React, { Component } from "react";
import { Form, Input, Select, Spin, DatePicker, Icon, Button } from "antd";
import debounce from "lodash/debounce";
import moment from "moment";

let id = 0;
const { Option } = Select;
const { RangePicker } = DatePicker;

class DynamicField extends Component {
  constructor(props) {
    super(props);

    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
  }

  state = {
    data: [],
    fetching: false,
    names: [],
    dates: [],
  };

  componentDidMount() {
    this.setState(
      {
        names: [
          [
            { key: "tom", label: "tom" },
            { key: "lina", label: "lina" },
          ],
          [
            { key: "tom", label: "tom" },
            { key: "lina", label: "lina" },
          ],
        ],
        dates: [
          [moment(), moment()],
          [moment(), moment()],
        ],
      },
      () => this.state.dates.forEach(this.add)
    );
  }

  fetchUser = (value) => {
    console.log("fetching user", value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    fetch("https://randomuser.me/api/?results=5")
      .then((response) => response.json())
      .then((body) => {
        if (fetchId !== this.lastFetchId) {
          // for fetch callback order
          return;
        }
        const data = body.results.map((user) => ({
          text: `${user.name.first} ${user.name.last}`,
          value: user.login.username,
        }));
        this.setState({ data, fetching: false });
      });
  };

  handleChange = (value) => {
    this.setState({
      data: [],
      fetching: false,
    });
  };

  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    // We need at least one passenger
    if (keys.length === 0) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter((key) => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { fetching, data, names, dates } = this.state;

    getFieldDecorator("keys", { initialValue: [] });

    const keys = getFieldValue("keys");
    const formItems = keys.map((k, index) => {
      return (
        <Form.Item wrapperCol={{ span: 24 }} key={k}>
          <Form.Item style={{ display: "inline-block" }} required={false}>
            {getFieldDecorator(`names[${k}]`, {
              validateTrigger: ["onChange", "onBlur"],
              initialValue: names[k],
              rules: [
                {
                  required: true,
                  message:
                    "Please input passenger's name or delete this field.",
                },
              ],
            })(
              <Select
                mode="multiple"
                labelInValue
                placeholder="Select users"
                notFoundContent={fetching ? <Spin size="small" /> : null}
                filterOption={false}
                onSearch={this.fetchUser}
                onChange={this.handleChange}
                style={{ width: 350 }}
              >
                {data.map((d) => (
                  <Option key={d.value}>{d.text}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item style={{ display: "inline-block" }} required={false}>
            {getFieldDecorator(`dates[${k}]`, {
              validateTrigger: ["onChange"],
              initialValue: dates[k],
              rules: [
                {
                  required: true,
                  message:
                    "Please input passenger's name or delete this field.",
                },
              ],
            })(
              <RangePicker
                placeholder="passenger name"
                style={{ width: 350 }}
              />
            )}
          </Form.Item>
          <Form.Item style={{ display: "inline-block" }}>
            {keys.length > 0 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.remove(k)}
              />
            ) : null}
          </Form.Item>
        </Form.Item>
      );
    });

    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          {formItems}
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="dashed" onClick={this.add}>
              <Icon type="plus" /> 添加排班
            </Button>
          </Form.Item>
        </Form>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item style={{ display: "inline-block" }} required={false}>
            {getFieldDecorator("age", {
              validateTrigger: ["onChange"],
              rules: [
                {
                  required: true,
                  message:
                    "Please input passenger's name or delete this field.",
                },
              ],
            })(<Input placeholder="passenger name" style={{ width: 350 }} />)}
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

const WrappedDynamicField = Form.create({ name: "dynamic_field" })(
  DynamicField
);

export default WrappedDynamicField;
