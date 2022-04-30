import React from "react";
import DareState from "../Dare/Dare.state.jsx";

function Header() {
  const { startGame, setStartGame, setPlayers } = DareState.useContainer();

  const handleResetButtonClick = () => {
    if (
      window.confirm(
        "Are you sure you want to reset the game? You will lose all progress."
      )
    ) {
      setStartGame(false);
      setPlayers([]);
    }
  };

  return (
    <div className="flex items-center">
      <h1 className="header text-2xl sm:text-3xl xl:text-4xl font-semibold drop-shadow-lg">
        Random Dare Generator
      </h1>
      {startGame && (
        <div
          className="reset-button ml-6 bg-white rounded-lg w-20 h-8 grid items-center justify-items-center drop-shadow-lg cursor-pointer"
          onClick={handleResetButtonClick}
        >
          <span className="text-xl font-semibold text-purple-500">RESET</span>
        </div>
      )}
    </div>
  );
}

export default Header;
