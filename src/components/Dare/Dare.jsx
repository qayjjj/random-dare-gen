import React, { useEffect, useState } from "react";
import DareState from "./Dare.state.jsx";
import Pause from "../Pause/Pause";
import "./styles.css";

function Dare() {
  const { players, setPlayers, paused, setPaused } = DareState.useContainer();
  
  // An array of duplicate players to prevent predictable player cycle
  const [dupPlayers, setDupPlayers] = useState([...players].concat(players));
  const dares = require("./Dares.json");

  const tickIntervals = [
    21, 13, 8, 5, 3, 2,                 // The ticker speeding up...
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // Ticking...
    2, 3, 5, 8, 13, 21, 34              // And slowing down.
  ];
  const tickMultiplier = 30; // Multiplied with intervals to get length in ms
  const [tickCount, setTickCount] = useState(0);
  const [currentNameIndex, setCurrentNameIndex] = useState(0);

  const isAnimating = () => tickCount < tickIntervals.length;

  useEffect(() => {
    if (isAnimating()) {
      const interval = setInterval(() => {
        setTickCount(tickCount + 1);
        setCurrentNameIndex((currentNameIndex + 1) % dupPlayers.length);
      }, tickIntervals[tickCount] * tickMultiplier);

      return () => {
        clearInterval(interval);
      };
    } else return;
  }, [tickCount, currentNameIndex, dupPlayers]);

  const [playersLeft, setPlayersLeft] = useState(dupPlayers.length);
  const [daresLeft, setDaresLeft] = useState(dares.length);
  const [acceptDare, setAcceptDare] = useState(false);

  // Choose a random player from the tempPlayer array
  const getRandomPlayer = () => {
    const index = Math.floor(Math.random() * playersLeft);
    const player = dupPlayers[index];
    setCurrentNameIndex(
      (playersLeft +
        dupPlayers.length -
        (tickIntervals.length % dupPlayers.length) -
      1) %
      dupPlayers.length
    );

    dupPlayers[index] = dupPlayers[playersLeft - 1];
    dupPlayers[playersLeft - 1] = player;
    setPlayersLeft(playersLeft - 1);

    if (playersLeft === 1) setPlayersLeft(dupPlayers.length);
    return player;
  };

  // Choose a random dare from the dares array
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
    setPlayers(
      players.map((player) => {
        if (player.name === currentPlayer.name) {
          player.score--;
        }
        return player;
      })
    );
    setAcceptDare(false);
    setPaused(true);
  };

  const handleAccept = () => {
    setPlayers(
      players.map((player) => {
        if (player.name === currentPlayer.name) {
          player.score++;
        }
        return player;
      })
    );
    setAcceptDare(true);
    setPaused(true);
  };

  const handleNextDare = () => {
    setCurrentPlayer(getRandomPlayer());
    setCurrentDare(getRandomDare());
    setTickCount(0);
  };

  return (
    <div className="flex flex-col items-center mt-36">
      {/* Current Player */}
      <div className={isAnimating() ? null : "animation-name-selected"}>
        <h1 className="text-5xl drop-shadow-lg font-semibold">
          {dupPlayers[currentNameIndex].name}
        </h1>
      </div>

      {/* Current Dare */}
      <div className="dare-box bg-white h-48 'w-1/2 sm:w-1/3 lg:w-2/3' mt-8 grid place-items-center px-14 text-center">
        <span className="dare-text drop-shadow-md font-semibold text-3xl">
          {currentDare.text}
        </span>
      </div>

      {/* Accept and Decline buttons */}
      {!isAnimating() &&
        <div className="flex justify-between 'w-1/2 sm:w-1/3 lg:w-2/3' px-10">
          <div
            id="decline-button"
            className="decline-button 'w-3/7 sm:w-2/7 lg:w-4/7' mt-12 h-24 px-12 rounded-full flex place-content-center items-center"
            onClick={handleDecline}
          >
            <span className="decline-text text-5xl font-extrabold tracking-widest">
              Decline
            </span>
          </div>
          <div
            id="accept-button"
            className="accept-button 'w-3/7 sm:w-2/7 lg:w-4/7' mt-12 h-24 px-12 rounded-full flex place-content-center items-center"
            onClick={handleAccept}
          >
            <span className="accept-text text-5xl font-extrabold tracking-widest">
              Accept
            </span>
          </div>
        </div>
      }

      {/* Pause screen */}
      {paused && (
        <Pause acceptDare={acceptDare} handleNextDare={handleNextDare} />
      )}
    </div>
  );
}

export default Dare;
