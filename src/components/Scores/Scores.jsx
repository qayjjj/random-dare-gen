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
    <table className="text-left w-1/2 sm:w-2/5 lg:w-1/3 -mt-40 sm:-mt-32 xl:-mt-28">
      <tbody>
        <tr>
          <th
            colSpan={2}
            className="text-center text-2xl sm:text-3xl xl:text-4xl font-semibold"
          >
            Scores
          </th>
        </tr>
        {sortedPlayers.map((player, index) => {
          return (
            <tr key={player.name}>
              <td className="py-2 flex items-center">
                <span className="text-xl sm:text-2xl xl:text-3xl font-semibold">
                  {player.name}
                </span>
                {index === 0 && (
                  <img className="ml-4 inline w-4 sm:w-6" src={star} alt="star"/>
                )}
              </td>
              <td className="text-right py-2">
                <span className="text-xl sm:text-2xl xl:text-3xl">
                  {player.score}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default memo(Scores);
