import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "./styles/reset.scss";
import { Manage } from "@/pages/Manage";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/manage" />
        </Route>
        <Route path="/manage" exact>
          <Manage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
