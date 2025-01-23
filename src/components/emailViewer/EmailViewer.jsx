import React from "react";

const EmailViewer = ({ email, handleDecision, goBack, onToggleStar }) => {
  if (!email) {
    return (
      <section className="email-viewer">
        <h2>Selecciona un correo</h2>
      </section>
    );
  }

  const isDecidable = !!email.effects;

  return (
    <section className="email-viewer">
      <h2>{email.subject}</h2>
      <div dangerouslySetInnerHTML={{ __html: email.content }} />

      {isDecidable && handleDecision && (
        <>
          <button className="approve" onClick={() => handleDecision(email.id, "approve")}>
            Aprobar
          </button>
          <button className="reject" onClick={() => handleDecision(email.id, "reject")}>
            Rechazar
          </button>
        </>
      )}

      {onToggleStar && (
        <button
          onClick={() => onToggleStar(email.id)}
          style={{ backgroundColor: email.starred ? "#FFD700" : "#ddd" }}
        >
          {email.starred ? "★ Destacado" : "☆ Destacar"}
        </button>
      )}

      <button onClick={goBack}>Volver</button>
    </section>
  );
};

export default EmailViewer;
