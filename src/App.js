import React from "react";
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

function Notice() {
  return <>Notice</>;
}

function NoticeDetail() {
  return <>NoticeDetail</>;
}

function App() {
  return (
    <Router history={customHistory}>
      <header>
        <Link to="/notice">公告列表</Link>
        <Link to="/notice/1">查看详情</Link>
      </header>

      <main>
        <Route path="/notice" exact component={Notice} />
        <Route path="/notice/:id" component={NoticeDetail} />
      </main>
    </Router>
  );
}

export default App;
