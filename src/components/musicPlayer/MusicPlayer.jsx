import React, { useEffect, useRef, useState } from "react";
import mainMusic from "../../music/Main.wav";


const MusicPlayer = ({ economia, credibilidad, polarizacion }) => {
  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [unlockedTracks, setUnlockedTracks] = useState([0]);

  const tracks = [
    { name: "Tema Neutral", src: mainMusic, id: "neutral" },
   /* { name: "Tema Económico", src: economyMusic, id: "economia", condition: () => economia < 30 },
    { name: "Tema Polarización Alta", src: polarMusic, id: "polarizacion", condition: () => polarizacion > 75 },
    { name: "Tema Credibilidad Baja", src: credMusic, id: "credibilidad", condition: () => credibilidad < 50 },*/
  ];

  const handleTrackSelection = (index) => {
    if (!unlockedTracks.includes(index)) return;
    setCurrentTrackIndex(index);
    if (audioRef.current) {
      audioRef.current.src = tracks[index].src;
      audioRef.current.play();
      audioRef.current.volume = 0.5;
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
