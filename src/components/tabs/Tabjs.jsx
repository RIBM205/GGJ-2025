import React from "react";
import NewMailSprite from "./sprites/newMailSprite.png";
import NoNew from "./sprites/noNew.png";

const Tabs = ({ activeList, setActiveList, socialPool, promotionsPool }) => {
  // Verifica si hay nuevos correos en Social y Promotions
  const hasNewSocial = socialPool.some((email) => !email.read);
  const hasNewPromotions = promotionsPool.some((email) => !email.read);

  return (
    <div className="tabs">
      {/* Pestaña Principal (Main) */}
      <button
        className={`tab ${activeList === "main" ? "active" : ""}`}
        onClick={() => setActiveList("principal")}
      >
        Main
      </button>

      {/* Pestaña Social */}
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

      {/* Pestaña Promotions */}
      <button
        className={`tab ${activeList === "promotions" ? "active" : ""}`}
        onClick={() => setActiveList("promotions")}
      >
        Promotions
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
