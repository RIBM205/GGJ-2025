import React from "react";

const EmailViewer = ({ email, handleDecision, goBack }) => {
  if (!email) {
    return (
      <section className="email-viewer">
        <h2>Selecciona un correo para leer</h2>
      </section>
    );
  }
  const isDisabled = email.decision;


  if(isDisabled == true ) {
    return (
      <section className="email-viewer">
        <h2>{email.subject}</h2>
        <div dangerouslySetInnerHTML={{ __html: email.content }} />
        <button disabled>Aprobar</button>
        <button disabled>Rechazar</button>
        <button onClick={goBack}>Volver</button>
      </section>
    );
  }
  else{
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
}

export default EmailViewer;
