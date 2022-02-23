import React from 'react'
import './styles.css'
import arrow from './arrow.png'
import triangle from './Triangle.png'

function Home() {
    return (
        <div className="home-container w-screen flex flex-col items-center py-24">
 
        <h1 className="header text-4xl drop-shadow-md font-semibold">Who are the players?</h1>
       
        <input className="name-input mt-12 w-3/6 h-12 rounded-full drop-shadow-lg text-black py-5 px-8 text-xl"></input>

        <div className="mt-12 bg-white h-20 py-3 rounded-full drop-shadow-lg start-button text-center">
        <span className="text-5xl font-extrabold tracking-widest">
        Start
        </span>
        </div>
      
        </div>
    )
}

export default Home