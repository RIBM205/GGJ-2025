import React, { useState } from "react";

function StartMenu({ onStartGame, onOptions }) {
    return (
      <div className="start-menu">
        <img src="path_to_your_image.jpg" alt="Game Background" className="menu-background" />
        <div className="menu-buttons">
          <button onClick={onStartGame}>Jugar</button>
          <button onClick={onOptions}>Opciones</button>
        </div>
      </div>
    );
  }
  

export default StartMenu;
