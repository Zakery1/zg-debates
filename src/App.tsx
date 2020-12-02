import React from "react";

import routes from "./routes";

import "./App.css";

//components
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";

const App: React.FC = () => {
  return (
    <div className="App">

      <Header />
      {routes()}
      <Footer />
    </div>
  );
};

export default App;
