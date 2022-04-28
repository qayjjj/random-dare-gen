import React, { memo, useState } from "react";
import DareState from "../Dare/Dare.state.jsx";
import Scores from "../Scores/Scores";
import "./styles.css";

function Pause({ acceptDare, changeScore, handleNextDare }) {
  const [showScores, setShowScores] = useState(!acceptDare);
  const { setPaused } = DareState.useContainer();

  const handleDoneQuitButtonClick = (done) => {
    changeScore(done);
    setShowScores(true);
  };

  const handleNextButtonClick = () => {
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
            onClick={() => handleNextButtonClick()}
          >
            <span className="success-text text-5xl font-extrabold tracking-widest">
              Next
            </span>
          </div>
        </div>
      ) : (
        <div className="overlay-content w-screen flex flex-col items-center mt-60">
          {/* Complete dare & Done button */}
          <h1 className="text-6xl font-semibold">Complete your dare!</h1>
          <div className="flex">
            <div
              className="quit-button mt-12 w-60 h-24 flex text-center justify-center items-center"
              onClick={() => handleDoneQuitButtonClick(false)}
            >
              <span className="quit-text text-4xl font-extrabold tracking-widest">
                Quit
              </span>
            </div>
            <div
              className="success-button mt-12 w-60 h-24 flex text-center justify-center items-center ml-8"
              onClick={() => handleDoneQuitButtonClick(true)}
            >
              <span className="success-text text-4xl font-extrabold tracking-widest">
                Done
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(Pause);
