import React from "react";

const EmailList = ({ emails, onEmailClick }) => {
  return (
    <div className="email-list">
      {emails.map((email) => (
        <div
          key={email.id}
          className={`email-item ${email.revisado ? "" : "unread"}`}
          onClick={() => onEmailClick(email)}
        >
          <span className="subject">{email.subject}</span>
          <span className="snippet">{email.snippet}</span>
        </div>
      ))}
    </div>
  );
};

export default EmailList;
