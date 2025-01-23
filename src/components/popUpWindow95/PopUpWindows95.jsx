import React from "react";

const PopupWindow95 = ({ title, onClose, children }) => {
  return (
    <div className="popup95-overlay">
      <div className="popup95-window">
        <div className="popup95-titlebar">
          <span>{title}</span>
          <button className="popup95-closeBtn" onClick={onClose}>
            X
          </button>
        </div>
        <div className="popup95-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PopupWindow95;
