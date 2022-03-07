import React from "react";
import DareState from "./Dare.state.jsx";
import "./styles.css";

function Dare() {
  const { players } = DareState.useContainer();
  const dares = require("./Dares.json");
  let dare = dares[Math.floor(Math.random() * dares.length)];

  return (
    <div className="flex flex-col items-center mt-44">
      <h1 className="text-5xl drop-shadow-lg font-semibold">Nam</h1>
      <div className="dare-box bg-white h-48 w-3/6 mt-8 grid place-items-center px-14 text-center">
        <span className="dare-text drop-shadow-md font-semibold text-3xl">
          {dare.text}
        </span>
      </div>
    </div>
  );
}

export default Dare;
