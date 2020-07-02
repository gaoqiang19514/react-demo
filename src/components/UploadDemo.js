import React from "react";
import { Form, Button, Upload, Icon } from "antd";

class UploadDemo extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Dragger">
          {getFieldDecorator("dragger", {
            rules: [{ required: true, message: "Please select your country!" }],
            valuePropName: "fileList",
            initialValue: [
              {
                uid: "-1",
                name: "image.png",
                status: "done",
                url:
                  "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              },
            ],
            getValueFromEvent: this.normFile,
          })(
            <Upload.Dragger
              name="files"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Upload.Dragger>
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedUploadDemo = Form.create({ name: "upload_demo" })(UploadDemo);

export default WrappedUploadDemo;
