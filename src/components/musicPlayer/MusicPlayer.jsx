import React, { useEffect, useRef, useState } from "react";
import mainMusic from "../../music/Main.wav";

const MusicPlayer = ({ economia, credibilidad, polarizacion }) => {
  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [unlockedTracks, setUnlockedTracks] = useState([0]);
  const [userInteracted, setUserInteracted] = useState(false);

  const tracks = [
    { name: "Tema Neutral", src: mainMusic, id: "neutral" },
  ];

  const handleTrackSelection = (index) => {
    if (!unlockedTracks.includes(index)) return;
    setCurrentTrackIndex(index);
    if (audioRef.current) {
      audioRef.current.src = tracks[index].src;
      audioRef.current.play().catch((error) => {
        console.error("Error reproduciendo el audio:", error);
      });
      audioRef.current.volume = 0.5;
    }
  };

  const handleUserInteraction = () => {
    if (!userInteracted) {
      setUserInteracted(true);
      if (audioRef.current && tracks[0]) {
        audioRef.current.src = tracks[0].src;
        audioRef.current.play().catch((error) => {
          console.error("Error reproduciendo el audio después de la interacción:", error);
        });
        audioRef.current.volume = 0.5;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  }, [userInteracted]);

  useEffect(() => {
    if (userInteracted) {
      evaluateTrackUnlock();
    }
  }, [economia, credibilidad, polarizacion, userInteracted]);

  const evaluateTrackUnlock = () => {
    const newUnlocked = [...unlockedTracks];
    tracks.forEach((track, i) => {
      if (track.condition && track.condition() && !newUnlocked.includes(i)) {
        newUnlocked.push(i);
      }
    });
    setUnlockedTracks(newUnlocked);
  };

  return (
    <div className="music-player-container">
      <audio ref={audioRef} autoPlay={false}></audio>
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
