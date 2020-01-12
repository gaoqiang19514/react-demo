import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 100%;
  top: 100%;
`;
const Fixed = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  transform: translate(-50%, -52%);
  max-width: 90%;
`;
const Box = styled.div`
  padding: 8px 10px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 3px;
  color: #fff;
`;

class Toast extends Component {
  state = {
    show: false,
    msg: ""
  };

  open(msg) {
    this.setState({ show: true, msg });
  }

  close() {
    this.setState({ show: false });
  }

  render() {
    const { show, msg } = this.state;

    return (
      <Container>
        <Fixed>
          <CSSTransition
            in={show}
            timeout={300}
            classNames="fade"
            unmountOnExit
            onEnter={() => {}}
            onExited={() => {}}
          >
            <Box>{msg}</Box>
          </CSSTransition>
        </Fixed>
      </Container>
    );
  }
}

function createInstance() {
  const div = document.createElement("div");
  document.body.appendChild(div);
  let toast = ReactDOM.render(<Toast />, div);

  return {
    show(msg) {
      toast.open(msg);
    },
    hide() {
      toast.close();
    },
    destory() {
      if (div) {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
        instance = null;
        toast = null;
      }
    }
  };
}

let instance = null;
let timer = null;

export default (msg, interval = 1000) => {
  clearTimeout(timer);

  if (!instance) {
    instance = createInstance();
  }

  instance.show(msg);
  timer = setTimeout(() => {
    instance.hide();
  }, interval);

  return () => {
    instance.hide();
  };
};
