import React from "react";

const EmailListStarred = ({ emails, onEmailClick, onToggleStar }) => {
  return (
    <div className="email-list">
      {emails.length === 0 && (
        <p>No hay correos destacados</p>
      )}

      {emails.map((email) => {
        const unreadClass = email.revisado ? "" : "unread";
        return (
          <div
            key={email.id}
            className={`email-item ${unreadClass}`}
            onClick={() => onEmailClick(email)}
          >
            <span className="subject">
              {email.subject} {email.starred ? "★" : ""}
            </span>
            <span className="snippet">{email.snippet}</span>
          </div>
        );
      })}
    </div>
  );
};

export default EmailListStarred;
