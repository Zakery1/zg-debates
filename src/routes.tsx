import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./component/Login/Login";
import Dashboard from "./component/Dashboard/Dashboard";
import Category from "./component/Category/Caregory";

export default function routes() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route path="/category" component={Category} />

      {/* <Route path='/book/:id' render={(props) => {
                    return ( <BookDetail {...props } /> )
                }} /> */}
    </Switch>
  );
}
