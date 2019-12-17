import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Search extends Component {
  static propTypes = {
    searchText: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
  };

  componentDidMount() {
    if (this.ref) {
      this.ref.focus();
    }
  }

  render() {
    const { searchText, onChange, onCancel, onSubmit } = this.props;

    return (
      <form action="" onSubmit={onSubmit}>
        <input
          type="search"
          ref={ref => {
            this.ref = ref;
          }}
          value={searchText}
          onChange={onChange}
          placeholder="搜索"
        />
        <button type="button" onClick={onCancel}>
          cancel
        </button>
      </form>
    );
  }
}
