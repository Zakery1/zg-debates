import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./component/Login/Login";
import Dashboard from "./component/Dashboard/Dashboard";
import Category from "./component/Category/Category";
import CurrentDiscussion from "./component/CurrentDiscussion/CurrentDiscussion";

export default function routes() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/category" component={Category} />
      <Route exact path="/category/issue" component={CurrentDiscussion} />
      <Route path="/" render={() => <div>404</div>} />


      {/* <Route path='/book/:id' render={(props) => {
                    return ( <BookDetail {...props } /> )
                }} /> */}
    </Switch>
  );
}
