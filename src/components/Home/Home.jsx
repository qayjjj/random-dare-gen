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
    const names = input.replaceAll(/\s/g, "").split(",");
    let players = [];
    names.map((name) => players.push({ name: name, score: 0 }));
    setStartGame(true);
    setPlayers(players);
  };

  const handleAddPlayer = () => {
    let newPlayerInput = document.querySelector(".name-input").cloneNode(true);
    newPlayerInput.firstChild.value = "";
    newPlayerInput.lastChild.onclick = handleRemovePlayer;
    document.querySelector("#name-input-fields").append(newPlayerInput);
  };

  const handleRemovePlayer = (e) => {
    let currentInput = e.target.parentNode;
    currentInput.remove();
  };

  return (
    <div className="home-container flex flex-col items-center mt-32">
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

      <div
        id="name-input-fields"
        className="mt-6 w-1/4 text-black text-xl flex flex-col items-center relative"
      >
        <div className="name-input relative w-full flex">
          <input
            placeholder="Enter player's name"
            className="input-field mt-2 w-full h-10 rounded-full drop-shadow-lg py-5 px-8 relative"
            onChange={(e) => handleOnChange(e)}
          ></input>
          <span
            className="remove-button text-4xl rotate-45 absolute -right-8 top-1 cursor-pointer drop-shadow-lg"
            onClick={(e) => handleRemovePlayer(e)}
          >
            +
          </span>
        </div>
      </div>

      <div
        className="add-player-button 'w-1/4 sm:w-1/6 lg:w-1/2' mt-4 rounded-full drop-shadow-lg h-10 cursor-pointer grid place-items-center"
        onClick={() => handleAddPlayer()}
      >
        <span className="text-5xl font-bold plus-sign -mt-2">+</span>
      </div>

      <div
        id="start-button"
        className="start-button 'w-1/5 sm:w-1/8 lg:w-1/3' mt-12 h-20 px-12 rounded-full flex place-content-center items-center justify-between"
        onClick={inputValid ? handleOnClick : null}
      >
        <span className="start-text text-5xl font-extrabold tracking-widest">
          Start
        </span>
        <img
          src={inputValid ? whiteTriangle : triangle}
          className="arrow-pic h-8"
          alt="Triangle.png"
        />
      </div>
    </div>
  );
}

export default Home;
