import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./component/Login/Login";
import Issues from "../src/component/Issues/Issues";

export default function routes() {
  return (
    <Switch>
      <Route exact path="/" component={Issues} />

      <Route path="/login" component={Login} />
    </Switch>
  );
}
