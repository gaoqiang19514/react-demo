import React, { Component } from "react";

class Textarea extends Component {
  render() {
    return (
      <div>
        <textarea>{this.props.comment.value}</textarea>
      </div>
    );
  }
}

export default Textarea;
