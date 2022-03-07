import React from "react";
import DareState from "../Dare/Dare.state.jsx";

function Header() {
  const { setStartGame, setPlayers } = DareState.useContainer();

  const handleClick = () => {
    setStartGame(false);
    setPlayers([]);
  };

  return (
    <h1
      className="header text-4xl font-semibold drop-shadow-lg cursor-pointer"
      onClick={handleClick}
    >
      Random Dare Generator
    </h1>
  );
}

export default Header;
