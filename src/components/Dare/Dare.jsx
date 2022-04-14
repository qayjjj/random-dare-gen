import React, { useEffect, useState } from "react";
import DareState from "./Dare.state.jsx";
import Pause from "../Pause/Pause";
import "./styles.css";

function Dare() {
  const { players, setPlayers, paused, setPaused } = DareState.useContainer();

  // An array of duplicate players to prevent predictable player cycle, and the dare array
  const [dupPlayers, setDupPlayers] = useState(players.slice().concat(players));
  const dares = require("./Dares.json");

  const totalTicks = 20;
  const tickIntervals = [650, 400, 250, 150, 100, 50, 50, 100, 150, 250, 400, 650];
  const [countdown, setCountdown] = useState(totalTicks);
  const [currentNameIndex, setCurrentNameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
        setCurrentNameIndex((currentNameIndex + 1) % dupPlayers.length);
        console.log(totalTicks - countdown);
      }
    }, Math.pow(1.1, totalTicks - countdown));
    return () => {
      clearInterval(interval);
    };
  }, [countdown, currentNameIndex, dupPlayers]);

  const [playersLeft, setPlayersLeft] = useState(dupPlayers.length);
  const [daresLeft, setDaresLeft] = useState(dares.length);

  // Function object to choose a random player from the tempPlayer array
  const getRandomPlayer = () => {
    const index = Math.floor(Math.random() * playersLeft);
    const player = dupPlayers[index];
    setCurrentNameIndex(
      (playersLeft + dupPlayers.length - (totalTicks % dupPlayers.length) - 1) % dupPlayers.length
    );

    dupPlayers[index] = dupPlayers[playersLeft - 1];
    dupPlayers[playersLeft - 1] = player;
    setPlayersLeft(playersLeft - 1);

    if (playersLeft === 1) setPlayersLeft(dupPlayers.length);
    return player;
  };

  // Function object to choose a random dare from the dares array
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
    if (countdown === 0) {
      setPlayers(
        players.map((player) => {
          if (player.name === currentPlayer.name) {
            player.score--;
          }
          return player;
        })
      );
      handleNextDare();
    }
  };

  const handleAccept = () => {
    if (countdown === 0) {
      setPlayers(
        players.map((player) => {
          if (player.name === currentPlayer.name) {
            player.score++;
          }
          return player;
        })
      );
      setPaused(true);
    }
  };

  const handleNextDare = () => {
    setCurrentPlayer(getRandomPlayer());
    setCurrentDare(getRandomDare());
    setCountdown(totalTicks);
  };

  return (
    <div className="flex flex-col items-center mt-36">
      {/* Current Player */}
      <h1 className="text-5xl drop-shadow-lg font-semibold">
        {dupPlayers[currentNameIndex].name}
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

      {paused && <Pause handleNextDare={handleNextDare} />}
    </div>
  );
}

export default Dare;
