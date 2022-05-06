import React, { memo } from "react";
import DareState from "../Dare/Dare.state.jsx";
import star from "./star.png";
import "./styles.css";

function Scores() {
  const { players } = DareState.useContainer();
  let sortedPlayers = [...players];
  sortedPlayers.sort((a, b) => {
    return b.score - a.score;
  });

  return (
    <div className="w-5/6 sm:w-3/5 md:w-1/2 lg:w-2/5 xl:px-6 -mt-40 sm:-mt-32 xl:-mt-26 h-4/5 sm:h-3/5 md:h-4/5">
      <h1 className="text-center text-2xl sm:text-3xl xl:text-4xl font-semibold">
        Scores
      </h1>
      <div className="scores-container w-full overflow-y-auto h-full mt-2 px-5">
        <table className="text-left w-full">
          <tbody className="">
            {sortedPlayers.map((player, index) => {
              if (!player.isEveryone) {
                // "Everyone" entry should not have a score
                return (
                  <tr key={player.name}>
                    <td className="py-2 flex items-center">
                      <span className="text-xl sm:text-2xl xl:text-3xl font-semibold">
                        {player.name}
                      </span>
                      {index === 0 && (
                        <img
                          className="star-pic ml-4 inline w-4 sm:w-6"
                          src={star}
                          alt="star"
                        />
                      )}
                    </td>
                    <td className="text-right py-2">
                      <span className="text-xl sm:text-2xl xl:text-3xl">
                        {player.score}
                      </span>
                    </td>
                  </tr>
                );
              } else return null;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(Scores);
