import React from "react";
import Header from "./components/Header";
import Home from "./components/Home/Home";
import Dare from "./components/Dare/Dare";
import Scores from "./components/Scores/Scores";

function App() {
  return (
    <div className="py-8 px-8">
      <Header />
      {/* <Scores /> */}
      {/* <Home /> */}
      <Dare />
    </div>
  );
}

export default App;
