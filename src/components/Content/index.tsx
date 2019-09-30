import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { routeList } from "@/config/router";
import "./index.scss";

const Content: React.FC = () => {
  return (
    <div className="content-component">
      <Switch>
        {routeList.map(route => {
          let child = null;
          if (route.redirect) {
            child = <Redirect to={route.redirect} />;
          } else if (route.component) {
            child = <route.component />;
          }
          return (
            <Route exact path={route.path} key={route.path}>
              {child}
            </Route>
          );
        })}
      </Switch>
    </div>
  );
};

export { Content };
