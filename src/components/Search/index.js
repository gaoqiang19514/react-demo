import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Search extends Component {
  static propTypes = {
    searchText: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onSubmit: PropTypes.func
  };

  render() {
    const { searchText, onChange, onFocus, onCancel, onSubmit } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={searchText}
          onChange={onChange}
          onFocus={onFocus}
          placeholder="搜索"
        />
        <button type="button" onClick={onCancel}>
          cancel
        </button>
      </form>
    );
  }
}
