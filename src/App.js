import React from "react";

import User from "./User";
import userHOC from "./userHOC";

import Search from "./Search";
import searchHOC from "./SearchWrapper";

const UserWrapper = userHOC(User);

const SearchWrapper = searchHOC(Search);

function App() {
  return (
    <div className="App">
      <UserWrapper />
      <SearchWrapper />
    </div>
  );
}

export default App;
