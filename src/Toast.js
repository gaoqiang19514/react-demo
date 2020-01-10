import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

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

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 100%;
  top: 100%;
`;

class Toast extends Component {
  state = {
    show: false,
    msg: ""
  };

  show(msg) {
    this.setState({ show: true, msg });
  }

  hide(cb = () => {}) {
    this.setState({ show: false }, () => {
      setTimeout(() => cb(), 300);
    });
  }

  render() {
    const { show, msg } = this.state;

    console.log(show);
    return (
      <Container>
        <Fixed>
          <CSSTransition
            in={show}
            timeout={300}
            unmountOnExit
            classNames="fade"
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
const createInstance = () => {
  const div = document.createElement("div");
  document.body.appendChild(div);
  const toast = ReactDOM.render(<Toast />, div);
  return {
    show(msg) {
      toast.show(msg);
    },
    hide() {
      toast.hide(() => {
        this.destory();
      });
    },
    destory() {
      if (div) {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
        instance = null;
      }
    }
  };
};

let instance = null;
let timer = null;
export default (msg, interval = 1000) => {
  clearTimeout(timer);
  if (instance) {
    instance.destory();
  }
  if (!instance) {
    instance = createInstance();
  }
  instance.show(msg);
  timer = setTimeout(() => {
    instance.hide();
  }, interval);
};
