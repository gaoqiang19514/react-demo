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

const TRANSITION_INTERVAL = 200;

class Toast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  componentDidMount() {
    this.setState({ show: true });
  }

  hide(cb = () => {}) {
    this.setState({ show: false }, cb);
  }

  render() {
    const { msg } = this.props;
    const { show } = this.state;

    return (
      <CSSTransition
        in={show}
        timeout={TRANSITION_INTERVAL}
        classNames="fade"
        unmountOnExit
        onEnter={() => {}}
        onExited={() => {}}
      >
        <Container>
          <Fixed>
            <Box>{msg}</Box>
          </Fixed>
        </Container>
      </CSSTransition>
    );
  }
}

function createInstance(msg) {
  const div = document.createElement("div");
  document.body.appendChild(div);
  const toast = ReactDOM.render(<Toast msg={msg} />, div);

  return {
    hide() {
      toast.hide(() => {
        setTimeout(() => {
          if (div) {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
            instance = null;
          }
        }, TRANSITION_INTERVAL);
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
}

let instance = null;
let timer = null;

export default (msg, interval = 1000) => {
  clearTimeout(timer);

  if (instance) {
    instance.destory();
  }

  instance = createInstance(msg);
  timer = setTimeout(() => {
    instance.hide(interval);
  }, interval);
};
