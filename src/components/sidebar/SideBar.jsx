import React from "react";
import MusicPlayer from "../musicPlayer/MusicPlayer";

const Sidebar = ({
  economia,
  credibilidad,
  polarizacion,
  onCompose,
  onShowError,
  onShowStarred,
}) => {
  return (
    <aside className="sidebar">
      <button className="compose" onClick={onCompose}>Redactar</button>
      <ul>
        <li className="active"><span>📥</span> Recibidos</li>
        <li onClick={onShowStarred}><span>⭐</span> Destacados</li>
        <li><span>📤</span> Enviados</li>
        <li><span>📄</span> Borradores</li>
        <li><span>🗑️</span> Papelera</li>
      </ul>

      <button style={{ marginTop: "1rem" }} onClick={onShowError}>
        Simular Error
      </button>

      <div className="music-player-sidebar">
        <MusicPlayer
          economia={economia}
          credibilidad={credibilidad}
          polarizacion={polarizacion}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
