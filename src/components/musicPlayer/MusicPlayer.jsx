import React, { useEffect, useRef, useState } from "react";

const MusicPlayer = ({ economia, credibilidad, polarizacion }) => {
  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [unlockedTracks, setUnlockedTracks] = useState([0]);

  const tracks = [
    { name: "Tema Neutral", src: "/music/neutral.mp3", id: "neutral" },
    { name: "Tema Económico", src: "/music/economia.mp3", id: "economia", condition: () => economia < 30 },
    { name: "Tema Polarización Alta", src: "/music/polarizacion.mp3", id: "polarizacion", condition: () => polarizacion > 75 },
    { name: "Tema Credibilidad Baja", src: "/music/credibilidad.mp3", id: "credibilidad", condition: () => credibilidad < 50 },
  ];

  const handleTrackSelection = (index) => {
    if (!unlockedTracks.includes(index)) return;
    setCurrentTrackIndex(index);
    if (audioRef.current) {
      audioRef.current.src = tracks[index].src;
      audioRef.current.play();
    }
  };

  const evaluateTrackUnlock = () => {
    const newUnlocked = [...unlockedTracks];
    tracks.forEach((track, i) => {
      if (track.condition && track.condition() && !newUnlocked.includes(i)) {
        newUnlocked.push(i);
      }
    });
    setUnlockedTracks(newUnlocked);
  };

  useEffect(() => {
    evaluateTrackUnlock();
  }, [economia, credibilidad, polarizacion]);

  return (
    <div className="music-player-container">
      <audio ref={audioRef} autoPlay></audio>
      <div className="music-player-track-list">
        <h4>Lista de Reproducción</h4>
        <ul>
          {tracks.map((track, i) => (
            <li
              key={i}
              onClick={() => handleTrackSelection(i)}
              className={`track-item ${
                currentTrackIndex === i ? "active" : ""
              } ${unlockedTracks.includes(i) ? "" : "locked"}`}
            >
              {track.name} {unlockedTracks.includes(i) ? "" : "(Bloqueado)"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MusicPlayer;
