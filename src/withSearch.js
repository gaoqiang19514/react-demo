import React, { Component } from "react";

function withSearch(WrappedComponent) {
  return class WrappingComponent extends Component {
    constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);

      this.state = {
        value: ""
      };
    }

    handleChange(e) {
      this.setState({ value: e.target.value });
    }

    render() {
      const newProps = {
        name: {
          value: this.state.value,
          onChange: this.handleChange
        }
      };

      return <WrappedComponent {...this.props} {...newProps} />;
    }
  };
}

export default withSearch;
