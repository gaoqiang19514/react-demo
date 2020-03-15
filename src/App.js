import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Loadable from "react-loadable";

function Loading() {
  return <div>loading...</div>;
}

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "Home" */ "./pages/Home"),
  loading: Loading
});
const About = Loadable({
  loader: () => import(/* webpackChunkName: "About" */ "./pages/About"),
  loading: Loading
});

function App() {
  return (
    <BrowserRouter>
      <Route path="/home" component={Home} />
      <Route path="/about" component={About} />
    </BrowserRouter>
  );
}

export default App;
