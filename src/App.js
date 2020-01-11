import React from "react";

import User from "./User";
import userHOC from "./userHOC";

import Search from "./Search";
import searchHOC from "./SearchWrapper";

const UserWrapper = userHOC(User);

const SearchWrapper = searchHOC(Search);
const SearchWrapper2 = searchHOC(Search);

function App() {
  return (
    <div className="App">
      <UserWrapper />
      <SearchWrapper />
      <SearchWrapper2 />
    </div>
  );
}

export default App;
