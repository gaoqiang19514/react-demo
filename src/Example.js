import React, { Component } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

const StyledBackground = styled.div``;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;

  .overlay-content {
    margin: 30px;
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const StyledItem = styled.div`
  margin: 30px;
`;

const StyledFixed = styled.div`
  position: fixed;
  z-index: 999;
  right: 20px;
  bottom: 20px;
`;

const StyledButton = styled.button`
  border: 0;
  background: transparent;
  outline: none;
`;
const ToggleButton = styled(StyledButton)`
  color: #fff;
  border-radius: 3px;
  padding: 10px 20px;
  background: #999;
`;

function Item() {
  return (
    <StyledItem>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro provident
      perferendis, voluptates aspernatur quaerat ad unde? Id suscipit, molestiae
      quisquam sunt eum asperiores non dolorum iste architecto. Blanditiis, quod
      dolorum?
    </StyledItem>
  );
}

class Example extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      showOverlay: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("update", this.state.showOverlay, prevState.showOverlay);
    if (this.state.showOverlay === prevState.showOverlay) {
      return;
    }

    if (this.state.showOverlay) {
      this.preventBodyScroll();
    } else {
      document.body.style.overflow = this.overflowCache || "visible";
    }
  }

  handleClick() {
    this.setState({ showOverlay: !this.state.showOverlay });
  }

  preventBodyScroll() {
    this.overflowCache = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }

  render() {
    const { showOverlay } = this.state;

    return (
      <div>
        <StyledBackground>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </StyledBackground>

        <StyledFixed>
          <ToggleButton type="button" onClick={this.handleClick}>
            toggle overlay
          </ToggleButton>
        </StyledFixed>

        <CSSTransition
          in={showOverlay}
          timeout={300}
          classNames="slide-from-right"
          unmountOnExit
        >
          <Overlay>
            <div className="overlay-content">
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
            </div>
          </Overlay>
        </CSSTransition>
      </div>
    );
  }
}

export default Example;
