import React from "react";
import "./styles.css";
import arrow from "./arrow.png";
import triangle from "./Triangle.png";

function Home() {
  return (
    <div className="home-container w-screen flex flex-col items-center py-24">
      <div className="relative">
        <h1 className="header text-4xl drop-shadow-md font-semibold">
          Who are the players?
        </h1>
        <img src={arrow} className="h-20 absolute -right-44 top-2.5" />
      </div>

      <input className="name-input mt-12 w-5/12 h-12 rounded-full drop-shadow-lg text-black py-5 px-8 text-xl"></input>

      <div className="mt-12 bg-white h-20 px-12 rounded-full drop-shadow-lg start-button flex place-content-center items-center justify-between">
        <span className="text-5xl font-extrabold tracking-widest">Start</span>
        <img src={triangle} className="h-8" />
      </div>
    </div>
  );
}

export default Home;
