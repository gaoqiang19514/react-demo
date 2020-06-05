import React, { useEffect } from "react";
import PropTypes from "prop-types";

const propTypes = {
  searchText: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

function Search() {
  const { searchText, onChange, onCancel, onSubmit } = this.props;

  useEffect(() => {
    if (this.ref) {
      this.ref.focus();
    }
  }, []);

  return (
    <form action="" onSubmit={onSubmit}>
      <input
        type="search"
        ref={(ref) => {
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

Search.propTypes = propTypes;

export default Search;
