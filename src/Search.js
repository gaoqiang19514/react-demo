import React from "react";

function Search(props) {
  console.log(props.name.value);
  return (
    <div>
      Search
      <input type="text" {...props.name} />
    </div>
  );
}

export default Search;
