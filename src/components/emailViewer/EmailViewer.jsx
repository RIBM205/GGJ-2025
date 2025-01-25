import React from "react";

const EmailViewer = ({
  email,
  handleIntroDecision,
  handleDecision,
  goBack,
}) => {
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
      <div style={{ whiteSpace: "pre-line" }}>{email.content}</div>

      {/* Si es el introEmail => las opciones saltan a line "A","B","C" */}
      {email.id === "intro" && handleIntroDecision && email.options?.map((opt, idx) => (
        <button key={idx} onClick={() => handleIntroDecision(opt.line)}>
          {opt.label}
        </button>
      ))}

      {/* Si es un paso de la línea => cada option => handleDecision(option) */}
      {email.id !== "intro" && handleDecision && email.options?.map((opt, idx) => (
        <button key={idx} onClick={() => handleDecision(opt)}>
          {opt.label}
        </button>
      ))}

      <button onClick={goBack}>Volver</button>
    </section>
  );
};

export default EmailViewer;
