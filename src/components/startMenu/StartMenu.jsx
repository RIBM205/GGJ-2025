
import React from "react";
import Aty from "./atychiphobia.png";

function StartMenu({ onStartGame, onOptions }) {
  return (
    <div className="start-menu">
      <img src={Aty} alt="Game Background" className="menu-background" />
      <div className="menu-buttons">
        <button onClick={onStartGame}>PLAY</button>
        <button onClick={onOptions}>CONFIG</button>
      </div>
    </div>
  );
}

export default StartMenu;
