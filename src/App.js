import React from "react";

import User from "./User";
import withUser from "./withUser";

import Search from "./Search";
import withSearch from "./withSearch";

const UserWrapper = withUser(User);

const SearchWrapper = withSearch(Search);
const SearchWrapper2 = withSearch(Search);

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
