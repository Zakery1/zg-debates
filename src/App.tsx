import React from "react";

import routes from "./routes";

import "./App.scss";

//components
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="zg-routes"> {routes()}</div>
      <Footer />
    </div>
  );
};

export default App;
