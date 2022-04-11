import { useState } from "react";
import { createContainer } from "unstated-next";

const useDareState = () => {
  const [startGame, setStartGame] = useState(false);
  const [players, setPlayers] = useState([]);
  const [paused, setPaused] = useState(false);

  return {
    startGame,
    setStartGame,
    players,
    setPlayers,
    paused,
    setPaused,
  };
};

const DareState = createContainer(useDareState);
export default DareState;
