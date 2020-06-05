import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const propTypes = {
  searchText: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

function Search({ searchText, onChange, onCancel, onSubmit }) {
  const searchRef = useRef();

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  return (
    <form action="" onSubmit={onSubmit}>
      <input
        type="search"
        ref={searchRef}
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
