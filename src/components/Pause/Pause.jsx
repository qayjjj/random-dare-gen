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
            className="success-button mt-14 w-32 sm:w-48 xl:w-52 h-10 sm:h-14 xl:h-20 flex text-center justify-center items-center"
            onClick={() => handleNextButtonClick()}
          >
            <span className="success-text text-2xl sm:text-3xl xl:text-4xl font-extrabold tracking-widest">
              Next
            </span>
          </div>
        </div>
      ) : (
        <div className="overlay-content w-screen flex flex-col items-center mt-36 sm:mt-40 lg:mt-48 lg:mt-64">
          {/* Complete dare & Done button */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold">
            Complete your dare!
          </h1>
          <div className="flex flex-col md:flex-row">
            <div
              className="quit-button mt-6 md:mt-12 w-40 sm:w-52 lg:w-60 h-12 md:h-20 lg:h-24 flex text-center justify-center items-center"
              onClick={() => handleDoneQuitButtonClick(false)}
            >
              <span className="quit-text text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-widest">
                Quit
              </span>
            </div>
            <div
              className="success-button mt-2 md:mt-12 w-40 sm:w-52 lg:w-60 h-12 md:h-20 lg:h-24 flex text-center justify-center items-center md:ml-8"
              onClick={() => handleDoneQuitButtonClick(true)}
            >
              <span className="success-text text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-widest">
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
