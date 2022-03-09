import React, { useState } from "react";
import DareState from "./Dare.state.jsx";
import "./styles.css";

function Dare() {
  const { players } = DareState.useContainer();
  const dares = require("./Dares.json");

  const [currentPlayer, setCurrentPlayer] = useState(
    players[Math.floor(Math.random() * players.length)]
  );
  const [currentDare, setCurrentDare] = useState(
    dares[Math.floor(Math.random() * dares.length)]
  );

  const handleOnClick = () => {
    setCurrentPlayer(players[Math.floor(Math.random() * players.length)]);
    setCurrentDare(dares[Math.floor(Math.random() * dares.length)]);
  };

  // const declineOnMouseEnter = () => {
  //   document
  //     .getElementById("decline-button")
  //     .classList.add("drop-shadow-lg", "bg-lime-400", "cursor-pointer");
  //   document
  //     .getElementById("decline-text")
  //     .classList.add("drop-shadow-lg", "text-white");
  // };

  // const declineOnMouseLeave = () => {
  //   document
  //     .getElementById("decline-button")
  //     .classList.remove("drop-shadow-lg", "bg-lime-400", "cursor-pointer");
  //   document
  //     .getElementById("decline-text")
  //     .classList.remove("drop-shadow-lg", "text-white");
  // };

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
