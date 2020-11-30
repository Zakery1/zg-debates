import React from "react";
import "./App.css";

//components
import Header from "./component/Header/Header";
import IssuesBar from "./component/CategoriesBar/CategoriesBar";
import CurrentDiscussion from "./component/CurrentDiscussion/CurrentDiscussion";
import Footer from "./component/Footer/Footer";
import Login from "./component/Login/Login";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <IssuesBar />
      <CurrentDiscussion />
      <Login/>
      <Footer />
    </div>
  );
};

export default App;
