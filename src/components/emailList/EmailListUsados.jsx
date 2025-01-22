import React from "react";

const EmailListUsados = ({ emails }) => {
  return (
    <div className="email-list">
      {emails.map((email) => {
        // Podríamos marcar con una clase "used" para estilo en CSS
        return (
          <div
            key={`${email.id}-${email.decision}-${email.revisado}-${Math.random()}`}
            className="email-item used" 
          >
            {/* No hay onClick => inactivo */}
            <span className="subject">{email.subject}</span>
            <span className="snippet">{email.snippet}</span>
            {/* Podrías mostrar la decisión que se tomó, si quieres */}
            <span className="used-decision">
              Decisión: {email.decision ? email.decision : "Ninguna"}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default EmailListUsados;
