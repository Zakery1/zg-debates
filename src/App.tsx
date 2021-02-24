import React from "react";

import routes from "./routes";

import { CtxProvider } from "./context/UserContext";

import "./App.scss";

//components
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";

const App: React.FC = () => {
  return (
    <div className="App">
      <CtxProvider>
        <Header />

        <div className="zg-routes"> {routes()}</div>

        <Footer />
      </CtxProvider>
    </div>
  );
};

export default App;
