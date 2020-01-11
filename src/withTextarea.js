import React, { Component } from "react";

function withTextarea(WrappedComponent) {
  return class WrappingComponent extends Component {
    constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);

      this.state = {
        comment: ""
      };
    }

    handleChange(e) {
      this.setState({ comment: e.target.value });
    }

    render() {
      const newProps = {
        comment: {
          value: this.state.value,
          onChange: this.handleChange
        }
      };

      return <WrappedComponent {...this.props} {...newProps} />;
    }
  };
}

export default withTextarea;
