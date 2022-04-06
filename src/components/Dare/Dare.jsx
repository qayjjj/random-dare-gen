import React, { useEffect, useState } from "react";
import DareState from "./Dare.state.jsx";
// import Scores from "../Scores/Scores";
import "./styles.css";

function Dare() {
  const { players } = DareState.useContainer();

  // An array of duplicate players to prevent predictable player cycle, and the dare array 
  const [dupPlayers, setDupPlayers] = useState(players.slice().concat(players));
  const dares = require("./Dares.json");

  const initCountdown = 3000, frequency = 8;
  const [countdown, setCountdown] = useState(initCountdown);
  const [currentNameIndex, setCurrentNameIndex] = useState(0);

  const [playersLeft, setPlayersLeft] = useState(dupPlayers.length);
  const [daresLeft, setDaresLeft] = useState(dares.length);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - initCountdown / frequency);
        if (currentNameIndex + 1 >= dupPlayers.length) {
          setCurrentNameIndex(0);  
        } else setCurrentNameIndex(currentNameIndex + 1);
      }
    }, initCountdown / frequency);

    return () => {
      clearInterval(interval);
    };
  }, [countdown, currentNameIndex, dupPlayers]);

  // Closure to choose a random player from the tempPlayer array
  const getRandomPlayer = () => {
    const index = Math.floor(Math.random() * playersLeft);
    const player = dupPlayers[index];
    setCurrentNameIndex((playersLeft + 3 * dupPlayers.length - frequency - 1) % dupPlayers.length);

    dupPlayers[index] = dupPlayers[playersLeft - 1];
    dupPlayers[playersLeft - 1] = player;
    setPlayersLeft(playersLeft - 1);

    if (playersLeft === 1) setPlayersLeft(dupPlayers.length);
    console.log(dupPlayers);
    return player;
  };

  // Closure to choose a random dare from the dares array
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
    const playerIndex = players.indexOf(currentPlayer);
    players[playerIndex].score = Math.max(0, players[playerIndex].score - 1);
    handleNextDare();
    setCountdown(initCountdown);
  };

  const handleAccept = () => {
    const playerIndex = players.indexOf(currentPlayer);
    players[playerIndex].score++;
    handleNextDare();
    setCountdown(initCountdown);
  };

  const handleNextDare = () => {
    setCurrentPlayer(getRandomPlayer());
    setCurrentDare(getRandomDare());
  };

  return (
    <div className="flex flex-col items-center mt-36">
      <h1 className="text-5xl drop-shadow-lg font-semibold">
        {dupPlayers[currentNameIndex].name}
        {/* {currentNameIndex} */}
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
