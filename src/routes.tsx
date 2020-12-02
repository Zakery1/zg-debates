import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Login from "./component/Login/Login";

export default function routes() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
    </Switch>
  );
}
