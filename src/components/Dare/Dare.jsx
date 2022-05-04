import React, { useEffect, useState } from "react";
import DareState from "./Dare.state.jsx";
import Pause from "../Pause/Pause";
import check1 from "./check1.svg";
import check2 from "./check2.svg";
import x1 from "./x1.svg";
import x2 from "./x2.svg";
import "./styles.css";

function Dare() {
  // Original player array. Used for changing / showing scores and name animations
  const { players, setPlayers, paused, setPaused } = DareState.useContainer();
  // Duplicated players' entries. Used in randomizer to prevent predictable player cycles
  const [dupPlayers, setDupPlayers] = useState([...players].concat(players));

  const dares = require("./Dares.json");
  const [unusedDares, setUnusedDares] = useState([...dares]);

  // -------------------------------------------------------------------------
  // Animation for flashing names
  // -------------------------------------------------------------------------

  const nameTickerIntervals = [
    34,
    13,
    8,
    5,
    3,
    2, // The ticker speeding up...
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2, // Ticking...
    2,
    3,
    5,
    8,
    13,
    21,
    34, // And slowing down.
  ];
  const itvMultiplier = 25; // Multiplied with intervals to get length in ms
  const [tickCount, setTickCount] = useState(0);
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);

  const isAnimating = () =>
    players.length > 1 && tickCount < nameTickerIntervals.length;

  /**
   * Animates through the names in the players array, ending on currentPlayer
   */
  useEffect(() => {
    if (isAnimating()) {
      const interval = setInterval(() => {
        setCurrentAnimationIndex((currentAnimationIndex + 1) % players.length);
        setTickCount(tickCount + 1);
      }, nameTickerIntervals[tickCount] * itvMultiplier);

      return () => clearInterval(interval);
      
    } else return;
  });

  // -------------------------------------------------------------------------
  // Randomizers for players and dares
  // -------------------------------------------------------------------------

  const getRandomPlayer = () => {
    const index = Math.floor(Math.random() * dupPlayers.length);
    const player = dupPlayers[index];

    setStartingAnimationIndex(player);

    const remainingPlayers = [...dupPlayers];
    remainingPlayers.splice(index, 1);
    setDupPlayers(remainingPlayers);

    if (remainingPlayers.length === 0)
      setDupPlayers([...players].concat(players));
    return player;
  };

  const getRandomDare = (newPlayer) => {
    let availableDares = unusedDares;
    let suitableDares;

    while (true) {
      suitableDares = (newPlayer.isEveryone)
        ? availableDares.filter(dare => dare.supportMultiplayer)
        : availableDares;

      if (suitableDares.length > 0) break;

      availableDares = [...dares]; // Setting state won't take effect immediately; reset local var instead
    }

    const index = Math.floor(Math.random() * suitableDares.length);
    const dare = suitableDares[index];

    for (let i = 0; i < availableDares.length; i++) {
      if (availableDares[i] === dare)
        availableDares.splice(i, 1);
    }

    setUnusedDares(availableDares);
    return dare;
  };

  /**
   * Given the player, calculates the index the name animation should start from
   *
   * @param chosenPlayer the player the animation will end on
   */
  const setStartingAnimationIndex = (chosenPlayer) => {
    console.log(chosenPlayer);
    for (let i = 0; i < players.length; i++) {
      if (chosenPlayer === players[i]) {
        setCurrentAnimationIndex(
          (i -
            (nameTickerIntervals.length % players.length) + // Animation's starting index
            players.length) % // In case subtraction yields negative
          players.length // In case sum exceeds length
        );
        break;
      }
    }
  };

  // -------------------------------------------------------------------------
  // Event handlers for accept and decline buttons
  // -------------------------------------------------------------------------

  const [currentPlayer, setCurrentPlayer] = useState(() => getRandomPlayer());
  const [currentDare, setCurrentDare] = useState(() => getRandomDare(currentPlayer));

  const [acceptDare, setAcceptDare] = useState(false);

  /**
   * Update the score(s) of anyone except the "Everyone" entry
   * If the current player is "Everyone", update the entire score board instead
   * 
   * @param completeDare whether the player accepts the dare 
   */
  const changeScore = (completeDare) => {
    setPlayers(
      players.map((player) => {
        if (!player.isEveryone && (currentPlayer.isEveryone || player === currentPlayer)) {
          if (completeDare) {
            player.score++;
          } else {
            player.score--;
          }
        }
        return player;
      })
    );
  };

  const handleDecline = () => {
    changeScore(false);
    setAcceptDare(false);
    setPaused(true);
  };

  const handleAccept = () => {
    setAcceptDare(true);
    setPaused(true);
  };

  const handleNextDare = () => {
    const newPlayer = getRandomPlayer();
    setCurrentPlayer(newPlayer);  // setCurrentPlayer is not executed immediately...
    setCurrentDare(getRandomDare(newPlayer)); // ...so we have to pass newPlayer manually, as opposed to line 154
    setTickCount(0);
  };

  // -------------------------------------------------------------------------
  // Render method of Dare component
  // -------------------------------------------------------------------------

  return (
    <div className="flex flex-col items-center mt-12 md:mt-16 lg:mt-24 xl:mt-32">
      {/* Current Player */}
      <div className={isAnimating() ? null : "animation-name-selected"}>
        <h1 className="text-3xl md:text-4xl drop-shadow-lg font-semibold">
          {players[currentAnimationIndex].name}
        </h1>
      </div>

      {/* Current Dare */}
      <div className="dare-box bg-white h-36 md:h-48 w-4/5 md:w-2/3 lg:w-1/2 mt-4 md:mt-6 grid place-items-center px-8 md:px-14 text-center">
        <div className={tickCount === 0 ? "new-dare" : null}>
          <span className="dare-text drop-shadow-md font-semibold text-xl md:text-3xl">
            {currentDare.text}
          </span>
        </div>
      </div>

      {/* Accept and Decline buttons */}
      {!isAnimating() && (
        <div className="flex justify-between w-4/5 md:w-2/3 lg:w-1/2">
          <div
            id="decline-button"
            className="decline-button mt-3 md:mt-6 h-14 md:h-20 lg:h-24 w-5/12 md:rounded-full flex place-content-center items-center"
            onClick={handleDecline}
          >
            <span className="decline-text hidden sm:inline-block text-3xl md:text-4xl font-extrabold tracking-widest">
              Decline
            </span>
            <div className="decline-icon inline-block sm:hidden">
              <img src={x1} className="h-8" alt="x1" />
              <img src={x2} className="h-8" alt="x2" />
            </div>
          </div>
          <div
            id="accept-button"
            className="accept-button mt-3 md:mt-6 h-14 md:h-20 lg:h-24 w-5/12 rounded-full flex place-content-center items-center"
            onClick={handleAccept}
          >
            <span className="accept-text hidden sm:inline-block text-3xl md:text-4xl font-extrabold tracking-widest">
              Accept
            </span>
            <div className="accept-icon inline-block sm:hidden">
              <img src={check1} className="h-8" alt="check1" />
              <img src={check2} className="h-8" alt="check2" />
            </div>
          </div>
        </div>
      )}

      {/* Pause screen */}
      {paused && (
        <Pause
          acceptDare={acceptDare}
          handleNextDare={handleNextDare}
          changeScore={changeScore}
        />
      )}
    </div>
  );
}

export default Dare;
