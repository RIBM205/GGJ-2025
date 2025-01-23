import React from "react";

const EmailListUsados = ({ emails, onToggleStar }) => {
  return (
    <div className="email-list">
      {emails.map((email) => (
        <div key={email.id} className="email-item used">
          <span className="subject">
            {email.subject} {email.starred ? "★" : ""}
          </span>
          <span className="snippet">{email.snippet}</span>
          <span className="used-decision">
            Decisión: {email.decision ? email.decision : "Ninguna"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default EmailListUsados;
