// Sidebar.js

import React from "react";
import MusicPlayer from "../musicPlayer/MusicPlayer";

const Sidebar = ({
  economy,
  credibility,
  polarization,
  onCompose,
  onShowError,
  onShowStarred,
  isMusicMuted,
  musicVolume,
  isTutorialActive, // New prop
}) => {
  return (
    <aside className="sidebar">
      <button className="compose" onClick={onCompose}>Compose</button>
      <ul>
        <li
          className={`active ${isTutorialActive ? "highlight" : ""}`}
          onClick={() => {
            if (isTutorialActive) {
              // Optional: Automatically complete the tutorial when the user clicks the email
              // This can be managed via a callback prop
            }
          }}
        >
          <span>📥</span> Inbox
        </li>
        <li onClick={onShowStarred}><span>⭐</span> Starred</li>
        <li><span>📤</span> Sent</li>
        <li><span>📄</span> Drafts</li>
        <li><span>🗑️</span> Trash</li>
      </ul>

      <button style={{ marginTop: "1rem" }} onClick={onShowError}>
        Simulate Error
      </button>

      <div className="music-player-sidebar">
        <MusicPlayer
          economy={economy}
          credibility={credibility}
          polarization={polarization}
          isMusicMuted={isMusicMuted}
          musicVolume={musicVolume}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
