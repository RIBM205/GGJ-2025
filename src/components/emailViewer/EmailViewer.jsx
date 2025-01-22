import React from "react";

const EmailViewer = ({ email, handleDecision, goBack }) => {
  if (!email) {
    return (
      <section className="email-viewer">
        <h2>Selecciona un correo</h2>
      </section>
    );
  }

  return (
    <section className="email-viewer">
      <h2>{email.subject}</h2>
      <div dangerouslySetInnerHTML={{ __html: email.content }} />

      <button className="approve" onClick={() => handleDecision(email.id, "approve")}>
        Aprobar
      </button>
      <button className="reject" onClick={() => handleDecision(email.id, "reject")}>
        Rechazar
      </button>
      <button onClick={goBack}>Volver</button>
    </section>
  );
};

export default EmailViewer;
