import React from "react";
import { Route, Switch, Redirect, Link, useLocation } from "react-router-dom";

import "./App.css";
import jpg1 from "./1.jpg";
import jpg2 from "./2.jpg";
import TransitionRoute from "./TransitionRoute";

function Home() {
  return (
    <div className="page">
      <h1>Home</h1>

      <Link to="about">
        <img src={jpg1} alt="" />
      </Link>
    </div>
  );
}

function About() {
  return (
    <div className="page">
      <h1>About</h1>

      <Link to="home">
        <img src={jpg2} alt="" />
      </Link>
    </div>
  );
}

function App() {
  let location = useLocation();

  return (
    <TransitionRoute location={location}>
      <Switch location={location}>
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Redirect to="/home" />
      </Switch>
    </TransitionRoute>
  );
}

export default App;
