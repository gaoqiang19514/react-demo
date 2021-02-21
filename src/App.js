import React from "react";
import { Route, Switch, Redirect, Link, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./App.css";
import jpg1 from "./1.jpg";
import jpg2 from "./2.jpg";

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
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={450}
        onEntered={(arg1, arg2) => {
          console.log("arg1", arg1);
          console.log("arg2", arg2);
        }}
      >
        <Switch location={location}>
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Redirect to="/home" />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
