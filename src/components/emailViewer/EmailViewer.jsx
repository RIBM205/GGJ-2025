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
        <h2>Select an email</h2>
      </section>
    );
  }

  return (
    <section className="email-viewer">
      <h2>{email.subject}</h2>
      <div style={{ whiteSpace: "pre-line" }}>{email.content}</div>

      {email.id === "intro" && handleIntroDecision && email.options?.map((opt, idx) => (
        <button key={idx} onClick={() => handleIntroDecision(opt.line)}>
          {opt.label}
        </button>
      ))}

      {email.id !== "intro" && handleDecision && email.options?.map((opt, idx) => (
        <button key={idx} onClick={() => handleDecision(opt)}>
          {opt.label}
        </button>
      ))}

      <button onClick={goBack}>Back</button>
    </section>
  );
};

export default EmailViewer;
