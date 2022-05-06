import React, { useState } from "react";
import DareState from "../Dare/Dare.state.jsx";
import triangle from "./Triangle.png";
import whiteTriangle from "./Triangle-white.png";
import "./styles.css";

function Home() {
  const { setStartGame, setPlayers } = DareState.useContainer();
  const [inputValid, setInputValid] = useState(false);
  const [names, setNames] = useState([""]);

  const handleAddPlayer = () => {
    setNames(names.concat([""]));
  };

  const handleRemovePlayer = (index) => {
    const temp = [...names];
    temp.splice(index, 1);
    setNames(temp);
  };

  const checkInput = (input) => {
    return input === "" || input.trim().length === 0;
  };

  const handleInputChange = (e, index) => {
    const temp = [...names];
    temp[index] = e.target.value;
    const validity = temp.every(checkInput);
    if (!validity) {
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
    setNames(temp);
  };

  const handleStartGame = () => {
    let players = [];
    names.map((name) => {
      if (name !== "" && name.trim() !== "") {
        players.push({ name: name.trim(), score: 0 , isEveryone: false });
      }
      return null;
    });
    // An "Everyone" entry for interactions!
    if (players.length > 1)  
      players.push({ name: "Everyone", isEveryone: true });
    setStartGame(true);
    setPlayers(players);
  };

  return (
    <div className="home-container flex flex-col items-center mt-10 sm:mt-14 xl:mt-18">
      <h1 className="header text-2xl sm:text-4xl xl:text-5xl drop-shadow-lg font-semibold">
        Who are the players?
      </h1>

      <div className="mt-2 sm:mt-4 xl:mt-6 w-3/4 sm:w-2/3 md:w-1/2 xl:w-1/3 text-black text-xl flex flex-col items-center relative">
        {names.map((name, index) => (
          <div className="name-input relative w-full flex">
            <input
              id={index}
              value={name}
              placeholder="Enter player's name"
              className="input-field mt-2 w-full h-2 rounded-full drop-shadow-lg py-5 px-6 sm:px-8 relative"
              onChange={(e) => handleInputChange(e, index)}
              autoFocus={index === names.length - 1}
            ></input>
            {index !== 0 && (
              <span
                className="remove-button text-4xl rotate-45 absolute -right-8 top-1 cursor-pointer drop-shadow-lg"
                onClick={() => handleRemovePlayer(index)}
              >
                +
              </span>
            )}
          </div>
        ))}
      </div>

      <div
        className="add-player-button w-3/4 sm:w-2/3 md:w-1/2 xl:w-1/3 mt-2 rounded-full drop-shadow-lg h-10 cursor-pointer grid place-items-center"
        onClick={() => handleAddPlayer()}
      >
        <span className="text-5xl font-bold plus-sign -mt-2">+</span>
      </div>

      <div
        id="start-button"
        className="start-button w-3/4 sm:w-2/3 md:w-1/2 xl:w-1/3 mt-6 h-12 sm:h-14 rounded-full flex place-content-center items-center"
        onClick={inputValid ? handleStartGame : null}
      >
        <span className="start-text text-3xl sm:text-4xl font-extrabold tracking-widest">
          Start
        </span>
        <img
          src={inputValid ? whiteTriangle : triangle}
          className="arrow-pic h-5 sm:h-6 ml-4"
          alt="Triangle.png"
        />
      </div>
    </div>
  );
}

export default Home;
