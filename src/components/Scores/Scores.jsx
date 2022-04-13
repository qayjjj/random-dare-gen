import React, { memo } from "react";
import DareState from "../Dare/Dare.state.jsx";
import star from "./star.png";

function Scores() {
  const { players } = DareState.useContainer();
  let sortedPlayers = [...players];
  sortedPlayers.sort((a, b) => {
    return b.score - a.score;
  });

  return (
    <table className="text-left w-1/3 -mt-28">
      <tbody>
        <tr>
          <th colSpan={2} className="text-center text-6xl font-semibold">
            Scores
          </th>
        </tr>
        {sortedPlayers.map((player, index) => {
          return (
            <tr key={player.name}>
              <td className="py-2 flex items-center">
                <span className="text-3xl font-semibold">{player.name}</span>
                {index === 0 && <img className="ml-4 inline" src={star} />}
              </td>
              <td className="text-right py-2">
                <span className="text-3xl">{player.score}</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default memo(Scores);
