import React from "react";

const Sidebar = () => {
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
    </aside>
  );
};

export default Sidebar;
