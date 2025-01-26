import React from "react";
import NewMailSprite from "./sprites/newMailSprite.png";
import NoNew from "./sprites/noNew.png";

const Tabs = ({ activeList, setActiveList, socialPool, promotionsPool }) => {
  // Verificar si hay correos no leídos en cada pestaña
  const hasNewSocial = socialPool.some((email) => !email.revisado);
  const hasNewPromotions = promotionsPool.some((email) => !email.revisado);

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
        <img
          src={hasNewSocial ? NewMailSprite : NoNew}
          alt={hasNewSocial ? "New Mail" : "No New Mail"}
          className="tab-icon"
        />
      </button>
      <button
        className={`tab ${activeList === "promotions" ? "active" : ""}`}
        onClick={() => setActiveList("promotions")}
      >
        Promociones
        <img
          src={hasNewPromotions ? NewMailSprite : NoNew}
          alt={hasNewPromotions ? "New Mail" : "No New Mail"}
          className="tab-icon"
        />
      </button>
    </div>
  );
};

export default Tabs;
