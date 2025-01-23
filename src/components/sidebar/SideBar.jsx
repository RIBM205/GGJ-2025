import React from "react";
import MusicPlayer from "../musicPlayer/MusicPlayer";

const Sidebar = ({ economia, credibilidad, polarizacion }) => {
  return (
    <aside className="sidebar">
      <button className="compose">Redactar</button>
      <ul>
        <li className="active"><span>📥</span> Recibidos</li>
        <li><span>⭐</span> Destacados</li>
        <li><span>📤</span> Enviados</li>
        <li><span>📄</span> Borradores</li>
        <li><span>🗑️</span> Papelera</li>
      </ul>

      {/* Reproductor de música */}
      <div className="music-player-sidebar">
        <MusicPlayer economia={economia} credibilidad={credibilidad} polarizacion={polarizacion} />
      </div>
    </aside>
  );
};

export default Sidebar;
