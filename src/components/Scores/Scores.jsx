import React, { memo, useEffect } from "react";
import DareState from "../Dare/Dare.state.jsx";

function Scores() {
  const { players } = DareState.useContainer();
  const tempPlayers = players;
  const scoreTable = useEffect(() => {
    console.log("hi");
    // tempPlayers.map((player) => {
    //   return (
    //     <tr key={player.name}>
    //       <td>
    //         <span>{player.name}</span>
    //       </td>
    //       <td>
    //         <span>{player.score}</span>
    //       </td>
    //     </tr>
    //   );
    // });
  }, [players]);

  return (
    <table className="text-left w-40 fixed top-24">
      <tbody>
        <tr>
          <th colSpan={2}>Scores</th>
        </tr>
        {scoreTable}
      </tbody>
    </table>
  );
}

export default memo(Scores);
