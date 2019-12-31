import React from "react";
import { Router, Route } from "react-router-dom";

import "./App.css";

import history from "./services/history";

// BrowserRouter和Router基本上是一样的，只是Router可以在外部传入history，BrowserRouter则是内置了history

function Home() {
  return (
    <div>
      Home
      <button
        onClick={() => {
          history.push("/about");
        }}
      >
        to /about
      </button>
    </div>
  );
}

function About() {
  return (
    <div>
      About
      <button
        onClick={() => {
          history.push("/home");
        }}
      >
        to /home
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Route path="/" exact component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
      </Router>
    </div>
  );
}

export default App;
