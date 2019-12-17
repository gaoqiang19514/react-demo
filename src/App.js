import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/search" component={Search} />
          <Redirect to="/home" />
        </Switch>
      </div>
    );
  }
}
