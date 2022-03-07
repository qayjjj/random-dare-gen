import React, { useState } from "react";
import DareState from "../Dare/Dare.state.jsx";
import arrow from "./arrow.png";
import triangle from "./Triangle.png";
import whiteTriangle from "./Triangle-white.png";
import "./styles.css";

function Home() {
  const { setStartGame, players, setPlayers } = DareState.useContainer();
  const [inputValid, setInputValid] = useState(false);

  const handleOnChange = (e) => {
    if (e.target.value) {
      if (!inputValid) {
        setInputValid(true);
        document
          .getElementById("start-button")
          .classList.add("drop-shadow-lg", "bg-lime-400", "cursor-pointer");
        document
          .getElementById("start-text")
          .classList.add("drop-shadow-lg", "text-white");
      }
    } else {
      if (inputValid) {
        setInputValid(false);
        document
          .getElementById("start-button")
          .classList.remove("drop-shadow-md", "bg-lime-400", "cursor-pointer");
        document
          .getElementById("start-text")
          .classList.remove("drop-shadow-md", "text-white");
      }
    }
  };

  const handleOnClick = () => {
    const input = document.getElementById("name-input").value;
    const players = input.replaceAll(/\s/g, "").split(",");
    setStartGame(true);
    setPlayers(players);
  };

  return (
    <div className="home-container flex flex-col items-center mt-36">
      <div className="relative">
        <h1 className="header text-4xl drop-shadow-lg font-semibold">
          Who are the players?
        </h1>
        <img src={arrow} className="h-20 absolute -right-44 top-2.5" />
      </div>

      <input
        id="name-input"
        placeholder="Enter player names e.g. Jane, John, Jack"
        className="name-input mt-12 w-5/12 h-12 rounded-full drop-shadow-lg text-black py-5 px-8 text-xl"
        onChange={(e) => handleOnChange(e)}
      ></input>

      <div
        id="start-button"
        className="mt-12 bg-white h-20 px-12 rounded-full start-button flex place-content-center items-center justify-between"
        onClick={inputValid ? handleOnClick : null}
      >
        <span
          id="start-text"
          className="text-5xl font-extrabold tracking-widest"
        >
          Start
        </span>
        <img src={inputValid ? whiteTriangle : triangle} className="h-8" />
      </div>
    </div>
  );
}

export default Home;
