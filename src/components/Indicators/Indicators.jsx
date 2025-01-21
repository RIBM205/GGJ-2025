import React from "react";

const Indicators = ({ credibilidad, polarizacion, economia }) => {
  return (
    <div className="indicators">
      <span>Credibilidad: {credibilidad}</span>
      <span>Polarización: {polarizacion}</span>
      <span>Economía: {economia}</span>
    </div>
  );
};

export default Indicators;
