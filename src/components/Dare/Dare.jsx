import React, { useState } from "react";
import DareState from "./Dare.state.jsx";
import Scores from "../Scores/Scores";
import "./styles.css";

function Dare() {
  const { players, setPlayers } = DareState.useContainer();
  const tempPlayers = players.slice();
  const dares = require("./Dares.json");

  const [playersLeft, setPlayersLeft] = useState(tempPlayers.length);
  const [daresLeft, setDaresLeft] = useState(dares.length);

  const getRandomPlayer = () => {
    const index = Math.floor(Math.random() * playersLeft);
    const player = tempPlayers[index];

    tempPlayers[index] = tempPlayers[playersLeft - 1];
    tempPlayers[playersLeft - 1] = player;
    setPlayersLeft(playersLeft - 1);

    if (playersLeft === 1) setPlayersLeft(tempPlayers.length);
    return player;
  };

  const getRandomDare = () => {
    const index = Math.floor(Math.random() * daresLeft);
    const dare = dares[index];

    dares[index] = dares[daresLeft - 1];
    dares[daresLeft - 1] = dare;
    setDaresLeft(daresLeft - 1);

    if (daresLeft === 1) setDaresLeft(dares.length);
    return dare;
  };

  const [currentPlayer, setCurrentPlayer] = useState(() => getRandomPlayer());

  const [currentDare, setCurrentDare] = useState(() => getRandomDare());

  const handleDecline = () => {
    const playerIndex = tempPlayers.indexOf(currentPlayer);
    tempPlayers[playerIndex].score--;
    handleNextDare();
  };

  const handleAccept = () => {
    const playerIndex = tempPlayers.indexOf(currentPlayer);
    tempPlayers[playerIndex].score++;
    handleNextDare();
  };

  const handleNextDare = () => {
    setPlayers(tempPlayers);
    console.log(players);
    setCurrentPlayer(getRandomPlayer());
    setCurrentDare(getRandomDare());
  };

  return (
    <div className="flex flex-col items-center mt-36">
      <h1 className="text-5xl drop-shadow-lg font-semibold">
        {currentPlayer.name}
      </h1>

      {/* Current Dare */}
      <div className="dare-box bg-white h-48 w-3/6 mt-8 grid place-items-center px-14 text-center">
        <span className="dare-text drop-shadow-md font-semibold text-3xl">
          {currentDare.text}
        </span>
      </div>

      {/* Accept and Decline buttons */}
      <div className="flex justify-between w-3/6 px-10">
        <div
          className="decline-button w-3/7 mt-12 h-24 px-12 rounded-full flex place-content-center items-center"
          onClick={handleDecline}
        >
          <span className="decline-text text-5xl font-extrabold tracking-widest">
            Decline
          </span>
        </div>
        <div
          className="accept-button w-3/7 mt-12 h-24 px-12 rounded-full flex place-content-center items-center"
          onClick={handleAccept}
        >
          <span className="accept-text text-5xl font-extrabold tracking-widest">
            Accept
          </span>
        </div>
      </div>
    </div>
  );
}

export default Dare;
