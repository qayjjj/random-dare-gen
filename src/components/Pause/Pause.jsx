import React, { memo, useState } from "react";
import DareState from "../Dare/Dare.state.jsx";
import Scores from "../Scores/Scores";
import "./styles.css";

function Pause({ acceptDare, handleNextDare }) {
  const [showScores, setShowScores] = useState(!acceptDare);
  const { setPaused } = DareState.useContainer();
  const handleOnClick = () => {
    setPaused(false);
    handleNextDare();
  };

  return (
    <div className="fixed top-0 flex">
      <div className="absolute overlay w-screen h-screen bg-black opacity-90"></div>
      {/* Scores */}
      {showScores ? (
        <div className="overlay-content w-screen flex flex-col items-center mt-60">
          <Scores />
          <div
            className="success-button mt-8 w-64 h-24 rounded-full flex text-center justify-center items-center"
            onClick={() => handleOnClick()}
          >
            <span className="text-5xl font-extrabold tracking-widest">
              Next
            </span>
          </div>
        </div>
      ) : (
        <div className="overlay-content w-screen flex flex-col items-center mt-60">
          {/* Complete dare & Done button */}
          <h1 className="text-6xl font-semibold">Complete your dare!</h1>
          <div
            className="success-button mt-12 w-64 h-24 rounded-full flex text-center justify-center items-center"
            onClick={() => setShowScores(true)}
          >
            <span className="text-5xl font-extrabold tracking-widest">
              Done
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(Pause);
