
import React from "react";


const TutorialOverlay = ({ onComplete }) => {
  return (
    <div className="tutorial-overlay">
      <div className="tutorial-content">
        <p>Welcome to the game! Click on the <strong>Inbox</strong> email to get started.</p>
        <button onClick={onComplete}>Got it!</button>
      </div>
      <div className="tutorial-arrow"></div>
    </div>
  );
};

export default TutorialOverlay;
