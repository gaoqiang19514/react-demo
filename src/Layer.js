import React, { Component } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

const Mask = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
`;
const Content = styled.div`
  position: fixed;
  left: 100px;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  padding: 30px;
  background: #fff;
`;

const TRANSITION_INTERVAL = 200;

class Layer extends Component {
  render() {
    const { show, onClose } = this.props;

    return (
      <div>
        <CSSTransition
          in={show}
          timeout={TRANSITION_INTERVAL}
          classNames="fade"
          unmountOnExit
        >
          <Mask onClick={onClose} />
        </CSSTransition>
        <CSSTransition
          in={show}
          timeout={TRANSITION_INTERVAL}
          classNames="slide-from-right"
          unmountOnExit
        >
          <Content>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            facilis ratione exercitationem repellat eum, in, quas laborum
            commodi molestias libero reprehenderit pariatur, quidem blanditiis?
            Error deleniti quos illum omnis impedit.
          </Content>
        </CSSTransition>
      </div>
    );
  }
}

export default Layer;
