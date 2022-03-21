import React, { useState } from "react";
import DareState from "./Dare.state.jsx";
import "./styles.css";

function Dare() {
  const { players } = DareState.useContainer();
  const dares = require("./Dares.json");

  const [playersLeft, setPlayersLeft] = useState(players.length);
  const [daresLeft, setDaresLeft] = useState(dares.length);

  const getRandomPlayer = () => {
    const index = Math.floor(Math.random() * playersLeft);
    const player = players[index];

    players[index] = players[playersLeft - 1];
    players[playersLeft - 1] = player;
    setPlayersLeft(playersLeft - 1);

    if (playersLeft === 1) setPlayersLeft(players.length);
    return player;
  }

  const getRandomDare = () => {
    const index = Math.floor(Math.random() * daresLeft);
    const dare = dares[index];

    dares[index] = dares[daresLeft - 1];
    dares[daresLeft - 1] = dare;
    setDaresLeft(daresLeft - 1);

    if (daresLeft === 1) setDaresLeft(dares.length);
    return dare;
  }

  const [currentPlayer, setCurrentPlayer] = useState(() =>
    getRandomPlayer()
  );

  const [currentDare, setCurrentDare] = useState(() => 
    getRandomDare()
  );

  const handleOnClick = () => {
    setCurrentPlayer(getRandomPlayer());
    // setCurrentPlayer(players[Math.floor(Math.random() * playersLeft)]);
    setCurrentDare(getRandomDare());
  };

  return (
    <div className="flex flex-col items-center mt-44">
      <h1 className="text-5xl drop-shadow-lg font-semibold">{currentPlayer}</h1>

      <div className="dare-box bg-white h-48 w-3/6 mt-8 grid place-items-center px-14 text-center">
        <span className="dare-text drop-shadow-md font-semibold text-3xl">
          {currentDare.text}
        </span>
      </div>

      <div
        className="accept-button w-1/5 mt-12 bg-white h-24 px-12 rounded-full flex place-content-center items-center"
        onClick={handleOnClick}
      >
        <span className="accept-text text-5xl font-extrabold tracking-widest">
          Next
        </span>
      </div>
    </div>
  );
}

export default Dare;
