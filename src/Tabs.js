import React, { Component } from "react";
import PropTypes from "prop-types";

export const TabPane = ({ title, children }) => {
  return (
    <div>
      <div>{title}</div>
      <div>{children}</div>
    </div>
  );
};

class Tabs extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      activeKey: "1"
    };
  }

  handleClick(e) {
    const key = e.currentTarget.getAttribute("data-key");

    if (!key) {
      return;
    }

    this.setState({
      activeKey: key
    });
  }

  renderHeader() {
    return React.Children.map(this.props.children, item => {
      return (
        <div data-key={item.key} onClick={this.handleClick}>
          {item.props.title}
        </div>
      );
    });
  }

  renderContent() {
    return React.Children.map(this.props.children, item => {
      if (item.key === this.state.activeKey) {
        return <div>{item.props.children}</div>;
      }
    });
  }

  render() {
    return (
      <div>
        <div>{this.renderHeader()}</div>
        <div>{this.renderContent()}</div>
      </div>
    );
  }
}

Tabs.propTypes = {
  children: PropTypes.node
};

export default Tabs;
