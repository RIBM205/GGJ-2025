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
    const newUnlockedTracks = [...unlockedTracks];
    tracks.forEach((track, index) => {
      if (track.condition && track.condition() && !newUnlockedTracks.includes(index)) {
        newUnlockedTracks.push(index);
      }
    });
    setUnlockedTracks(newUnlockedTracks);
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
          {tracks.map((track, index) => (
            <li
              key={index}
              onClick={() => handleTrackSelection(index)}
              className={`track-item ${
                currentTrackIndex === index ? "active" : ""
              } ${unlockedTracks.includes(index) ? "" : "locked"}`}
            >
              {track.name} {unlockedTracks.includes(index) ? "" : "(Bloqueado)"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MusicPlayer;
