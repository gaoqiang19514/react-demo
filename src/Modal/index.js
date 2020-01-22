import React, { Component } from "react";
import styled from "styled-components";

import history from "../services/history";

const FixedContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`;
const Content = styled.div`
  position: absolute;
  top: 0;
  left: 100px;
  right: 0;
  bottom: 0;
  z-index: 10;
  padding: 20px;
  overflow: auto;
  background: #fff;
`;

class Modal extends Component {
  render() {
    return (
      <FixedContainer
        onClick={() => {
          history.goBack();
        }}
      >
        <Content>Content</Content>
      </FixedContainer>
    );
  }
}

export default Modal;
