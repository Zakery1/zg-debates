import React from "react";
import "./App.css";

//components
import Header from "./component/Header/Header";
import IssuesBar from "./component/IssuesBar/IssuesBar";
import CurrentDiscussion from "./component/CurrentDiscussion/CurrentDiscussion";
import Footer from "./component/Footer/Footer";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <IssuesBar />
      <CurrentDiscussion />
      <Footer />
    </div>
  );
};

export default App;
