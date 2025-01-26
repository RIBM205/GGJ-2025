// components/options/Options.jsx

import React from "react";

const Options = ({
  volume,
  isMuted,
  onVolumeChange,
  onMuteToggle,

  sfxVolume,
  isSfxMuted,
  onSfxVolumeChange,
  onSfxMuteToggle,

  onClose,
}) => {
  return (
    <div className="options-container">
      <h3 className="subtitle">Options</h3>

      {/* ================== Music Volume ================== */}
      <div className="volume-control">
        <label className="label">
          Music Volume: {isMuted ? "Muted" : `${volume}%`}
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={isMuted ? 0 : volume}
          onChange={onVolumeChange}
          className="slider"
          disabled={isMuted}
        />
        <button onClick={onMuteToggle} className="mute-button">
          {isMuted ? "Unmute Music" : "Mute Music"}
        </button>
      </div>

      {/* ================== SFX Volume ================== */}
      <div className="volume-control">
        <label className="label">
          SFX Volume: {isSfxMuted ? "Muted" : `${sfxVolume}%`}
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={isSfxMuted ? 0 : sfxVolume}
          onChange={onSfxVolumeChange}
          className="slider"
          disabled={isSfxMuted}
        />
        <button onClick={onSfxMuteToggle} className="mute-button">
          {isSfxMuted ? "Unmute SFX" : "Mute SFX"}
        </button>
      </div>

      {/* ================== Close Button ================== */}
      <div style={{ marginTop: "1rem" }}>
        <button className="mute-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Options;
