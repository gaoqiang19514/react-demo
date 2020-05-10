import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import axios from "axios";

const basePath = "/zfzh";

function getUserInfo() {
  return axios.get(`${basePath}/api/getUserInfo`);
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/about">About</Link>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>About</h1>
      <Link to="/home">Home</Link>
    </div>
  );
}

function NoFound() {
  return (
    <div>
      <h1>NoFound</h1>
      <Link to="/home">Home</Link>
    </div>
  );
}

async function loadData() {
  try {
    const { code, data } = await getUserInfo();
  } catch (err) {
    console.error(err);
  }
}

function App() {
  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <BrowserRouter basename={basePath}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Route component={NoFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
