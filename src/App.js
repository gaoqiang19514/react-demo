import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 400px;
  height: 500px;
  overflow: hidden;
  background: #ccc;
  ul {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    transition: all 0.3s ease-out;
    padding: 0;
    margin: 0;
  }
  li {
    line-height: 100px;
    text-align: center;
  }
`;

export class Child extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      items: props.items
    };
  }

  componentDidMount() {
    this.autoMove();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.items !== this.props.items) {
      this.setState({ items: this.props.items, index: 0 }, () => {
        this.autoMove();
      });
    }
  }

  autoMove() {
    clearInterval(this.timer);
    this.move(0);
    this.timer = setInterval(() => {
      this.setState({ index: this.getNextIndex() }, () => {
        this.move(-(this.state.index * 100));
      });
    }, 1000);
  }

  getNextIndex() {
    const nextIndex = this.state.index + 1;
    if (nextIndex > 5) {
      return 0;
    }
    return nextIndex;
  }

  move(top) {
    this.ref.style.top = top + "px";
  }

  render() {
    const { items } = this.state;
    return (
      <Container>
        <ul
          ref={ref => {
            this.ref = ref;
          }}
        >
          {items.map(item => {
            return <li key={item.value}>{item.value}</li>;
          })}
        </ul>
      </Container>
    );
  }
}

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        { value: 0 },
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5 },
        { value: 6 },
        { value: 7 },
        { value: 8 },
        { value: 9 }
      ]
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        items: [
          { value: 10 },
          { value: 11 },
          { value: 12 },
          { value: 13 },
          { value: 14 },
          { value: 15 },
          { value: 16 },
          { value: 17 },
          { value: 18 },
          { value: 19 }
        ]
      });
    }, 3000);

    setTimeout(() => {
      this.setState({
        items: [
          { value: 1340 },
          { value: 3411 },
          { value: 123 },
          { value: 3413 },
          { value: 1344 },
          { value: 135 },
          { value: 162 },
          { value: 1237 },
          { value: 12348 },
          { value: 12349 }
        ]
      });
    }, 13000);
  }

  render() {
    const { items } = this.state;
    return (
      <div>
        <Child items={items} />
      </div>
    );
  }
}

export default App;
