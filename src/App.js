import React from "react";

import User from "./User";
import withUser from "./withUser";

import Search from "./Search";
import withSearch from "./withSearch";

import Textarea from "./Textarea";
import withTextarea from "./withTextarea";

const UserWrapper = withUser(User);

const SearchWrapper = withSearch(Search);
const SearchWrapper2 = withSearch(Search);

const TextareaWrapper = withTextarea(Textarea);

function App() {
  return (
    <div className="App">
      <UserWrapper />
      <SearchWrapper />
      <SearchWrapper2 />
      <TextareaWrapper />
    </div>
  );
}

export default App;
