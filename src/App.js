import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import "antd/dist/antd.css";

import "./App.css";

function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "1", name: "tom", age: 30 },
        { id: "2", name: "lina", age: 29 },
      ]);
    }, 1000);
  });
}

class List extends Component {
  state = {
    loading: false,
    data: [],
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    try {
      this.setState({ loading: true });
      const res = await getData(this.props.type);
      this.setState({ data: res });
    } catch (err) {
      console.error(err);
    }
    this.setState({ loading: false });
  };

  render() {
    const { loading, data } = this.state;

    const content = loading ? (
      <span>loading...</span>
    ) : (
      <ul>
        {data.map((item) => (
          <li key={item.id} onClick={() => this.props.onClick(item.id)}>
            {item.name}
          </li>
        ))}
      </ul>
    );

    return (
      <div>
        <h1>List</h1>
        <div>{content}</div>
      </div>
    );
  }
}

class Detail extends Component {
  state = {
    loading: false,
    data: [],
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.loadData();
    }
  }

  loadData = async () => {
    try {
      this.setState({ loading: true });
      const res = await getData(this.props.id);
      this.setState({ data: res });
    } catch (err) {
      console.error(err);
    }
    this.setState({ loading: false });
  };

  render() {
    const { loading, data } = this.state;

    const content = loading ? (
      <span>loading...</span>
    ) : (
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    );

    return (
      <div>
        <h1>Detail</h1>
        <div>{content}</div>
        <button onClick={this.props.onBack}>back</button>
      </div>
    );
  }
}

class Intro extends Component {
  state = {
    loading: false,
    data: [],
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    try {
      this.setState({ loading: true });
      const res = await getData(this.props.type);
      this.setState({ data: res });
    } catch (err) {
      console.error(err);
    }
    this.setState({ loading: false });
  };

  render() {
    const { loading, data } = this.state;

    const content = loading ? (
      <span>loading...</span>
    ) : (
      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus, sed
        facere, quam reprehenderit est laudantium soluta numquam perspiciatis
        ratione porro placeat asperiores eligendi ad ab nemo impedit ipsum
        tenetur eum.
      </div>
    );

    return (
      <div>
        <h1>Intro</h1>
        <div>{content}</div>
      </div>
    );
  }
}

function Home({ type, onCancel }) {
  const [id, setId] = React.useState("");

  const renderContent = () => {
    if (id) {
      return <Detail id={id} onBack={() => setId("")} />;
    }

    if (type) {
      return <Intro type={type} />;
    }

    return null;
  };

  const handleClick = (id) => {
    setId(id);
  };

  return (
    <div>
      <Modal
        visible={!!type}
        destroyOnClose
        onCancel={onCancel}
        onOk={onCancel}
      >
        <div className="container">
          <div className="aside">
            <List onClick={handleClick} type={type} />
          </div>
          <div className="main">{renderContent()}</div>
        </div>
      </Modal>
    </div>
  );
}

function App() {
  const [type, setType] = React.useState("");

  return (
    <>
      <Home type={type} onCancel={() => setType("")} />
      <button onClick={() => setType("11")}>show intro</button>
    </>
  );
}

export default App;
