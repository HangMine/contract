import React from 'react';
import { Router, Route } from "react-router-dom";
import history from "@/router/history"
import Login from "@/views/Login/Login"
import routerView from "@/views/index";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router history={history}>
        <Route exact path="/" component={Login}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/app" component={routerView}></Route>
      </Router>
    </div>
  );
}

export default App;
