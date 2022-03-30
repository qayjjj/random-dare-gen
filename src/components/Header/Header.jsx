import React from "react";
import DareState from "../Dare/Dare.state.jsx";
import Scores from "../Scores/Scores";

function Header() {
  const { startGame, setStartGame, setPlayers } = DareState.useContainer();

  const handleClick = () => {
    setStartGame(false);
    setPlayers([]);
  };

  return (
    <div>
      <h1
        className="header text-4xl font-semibold drop-shadow-lg cursor-pointer"
        onClick={handleClick}
      >
        Random Dare Generator
      </h1>
      {startGame && <Scores />}
    </div>
  );
}

export default Header;
