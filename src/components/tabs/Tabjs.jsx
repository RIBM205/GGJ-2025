import React from "react";

const Tabs = ({ activeList, setActiveList }) => {
  return (
    <div className="tabs">
      <button
        className={`tab ${activeList === "principal" ? "active" : ""}`}
        onClick={() => setActiveList("principal")}
      >
        Principal
      </button>
      <button
        className={`tab ${activeList === "social" ? "active" : ""}`}
        onClick={() => setActiveList("social")}
      >
        Social
      </button>
      <button
        className={`tab ${activeList === "promotions" ? "active" : ""}`}
        onClick={() => setActiveList("promotions")}
      >
        Promociones
      </button>
      {/* "Destacados" se activa desde la sidebar en este ejemplo,
          pero podrías añadirlo también aquí si gustas. */}
    </div>
  );
};

export default Tabs;
