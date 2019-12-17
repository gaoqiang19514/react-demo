import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Detail from "./pages/Detail";

export default class App extends Component {
  render() {
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
}
