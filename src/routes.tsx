import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./component/Login/Login";
import Dashboard from "./component/Dashboard/Dashboard";
import CurrentDiscussion from "./component/CurrentDiscussion/CurrentDiscussion";
import User from "./component/User/User";

export default function routes() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/user" component={User} />
      <Route
        exact
        path="/discussion/:discussionId"
        component={CurrentDiscussion}
      />

      <Route path="/" render={() => <div>404</div>} />
    </Switch>
  );
}
