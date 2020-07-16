import React from "react";
import { Form, Modal, Upload, Button, Icon } from "antd";

const MAX_FILE_COUNT = 10;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

class UploadDemo extends React.Component {
  state = {
    previewTitle: "",
    previewVisible: false,
    previewImage: "",
  };

  componentDidMount() {
    // setTimeout(() => {
    //   this.props.form.setFieldsValue({
    //     fileList: [
    //       {
    //         uid: "-1",
    //         name: "image.png",
    //         status: "done",
    //         url:
    //           "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //       },
    //       {
    //         uid: "-2",
    //         name: "文件.rar",
    //         status: "done",
    //         url:
    //           "http://gxiami.alicdn.com/xiami-desktop/update/%E8%99%BE%E7%B1%B3%E9%9F%B3%E4%B9%90-7.2.7-x64-0919.rar",
    //       },
    //     ],
    //   });
    // }, 1000);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    e.fileList = e.fileList.map((file) => {
      if (file.response) {
        file.url = file.response.data.filePath;
      }
      return file;
    });

    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { previewTitle, previewVisible, previewImage } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator("fileList", {
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
              {
                uid: "-2",
                name: "文件.rar",
                status: "done",
                url:
                  "http://gxiami.alicdn.com/xiami-desktop/update/%E8%99%BE%E7%B1%B3%E9%9F%B3%E4%B9%90-7.2.7-x64-0919.rar",
              },
            ],
            getValueFromEvent: this.normFile,
          })(
            <Upload
              onPreview={this.onPreview}
              showUploadList={{ showDownloadIcon: true, showPreviewIcon: true }}
              action="/file-upload-service/webapi/v2.0/fileUpload/upload"
            >
              {this.renderBtn()}
            </Upload>
          )}
        </Form.Item>

        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    );
  }

  renderBtn = () => {
    const fields = this.props.form.getFieldsValue();
    if (fields.fileList.length < MAX_FILE_COUNT) {
      return (
        <Button>
          <Icon type="upload" /> Click to Upload
        </Button>
      );
    }

    return null;
  };

  handleCancel = () => this.setState({ previewVisible: false });

  onPreview = async (file) => {
    // 如果非图片类型，跳转下载

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };
}

const WrappedUploadDemo = Form.create({ name: "upload_demo" })(UploadDemo);

export default WrappedUploadDemo;
