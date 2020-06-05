import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Detail from "@/pages/Detail";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/detail" component={Detail} />
        <Redirect to="/home" />
      </Switch>
    </div>
  );
}

export default App;
