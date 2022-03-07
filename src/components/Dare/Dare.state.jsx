import React, { useState } from "react";
import { createContainer } from "unstated-next";

const useDareState = () => {
  const [startGame, setStartGame] = useState(false);
  const [players, setPlayers] = useState(null);

  return { startGame, setStartGame, players, setPlayers };
};

const DareState = createContainer(useDareState);
export default DareState;
