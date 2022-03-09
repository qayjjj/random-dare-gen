import React, { useState } from "react";
import DareState from "../Dare/Dare.state.jsx";
import arrow from "./arrow.png";
import triangle from "./Triangle.png";
import whiteTriangle from "./Triangle-white.png";
import "./styles.css";

function Home() {
  const { setStartGame, setPlayers } = DareState.useContainer();
  const [inputValid, setInputValid] = useState(false);

  const handleOnChange = (e) => {
    if (e.target.value) {
      if (!inputValid) {
        setInputValid(true);
        document
          .getElementById("start-button")
          .classList.add("start-button-clickable");
      }
    } else {
      if (inputValid) {
        setInputValid(false);
        document
          .getElementById("start-button")
          .classList.remove("start-button-clickable");
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
    <div className="home-container flex flex-col items-center mt-52">
      <div className="relative">
        <h1 className="header text-5xl drop-shadow-lg font-semibold">
          Who are the players?
        </h1>
        <img
          src={arrow}
          className="h-20 absolute -right-44 top-2.5"
          alt="arrow.png"
        />
      </div>

      <input
        id="name-input"
        placeholder="Enter player names e.g. Jane, John, Jack"
        className="name-input mt-12 w-6/12 h-16 rounded-full drop-shadow-lg text-black py-5 px-8 text-xl"
        onChange={(e) => handleOnChange(e)}
      ></input>

      <div
        id="start-button"
        className="start-button w-1/5 mt-12 h-20 px-12 rounded-full flex place-content-center items-center justify-between"
        onClick={inputValid ? handleOnClick : null}
      >
        <span className="start-text text-5xl font-extrabold tracking-widest">
          Start
        </span>
        <img
          src={inputValid ? whiteTriangle : triangle}
          className="h-8"
          alt="Triangle.png"
        />
      </div>
    </div>
  );
}

export default Home;
