import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./component/Login/Login";
import Dashboard from "./component/Dashboard/Dashboard";
import CurrentDiscussion from "./component/CurrentDiscussion/CurrentDiscussion";
import Category from "./component/Category/Category";

export default function routes() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route exact path="/discussion/:id" component={CurrentDiscussion} />
      <Route path="/" render={() => <div>404</div>} />
    </Switch>
  );
}
