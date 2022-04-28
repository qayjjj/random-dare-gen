import React, { memo } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Dare from "./components/Dare/Dare";
import Scores from "./components/Scores/Scores";
import DareState from "./components/Dare/Dare.state.jsx";

function AppView() {
  const { startGame } = DareState.useContainer();

  return (
    <div className="py-4 px-4 sm:py-8 sm:px-8">
      <Header />
      {startGame ? <Dare /> : <Home />}
    </div>
  );
}

/**
 * Container
 */
const App = () => (
  <DareState.Provider>
    <AppView />
  </DareState.Provider>
);

export default memo(App);
