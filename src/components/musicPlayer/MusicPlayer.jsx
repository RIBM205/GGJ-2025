import React, { useEffect, useRef, useState } from "react";
import mainMusic from "../../music/Main.wav";
import polarityMusic from "../../music/polarity.wav";
import economyMusic from "../../music/economi.wav";

const MusicPlayer = ({
  economy,
  credibility,
  polarization,
  isMusicMuted,
  musicVolume,
}) => {
  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [unlockedTracks, setUnlockedTracks] = useState([0]); // Solo la primera pista desbloqueada
  const [userInteracted, setUserInteracted] = useState(false);

  const tracks = [
    {
      name: "Neutral Theme",
      src: mainMusic,
      id: "neutral",
      condition: () => true, // Siempre desbloqueada
    },
    {
      name: "Economy Theme",
      src: economyMusic,
      id: "economy",
      condition: () => economy < 50, // Se desbloquea cuando economía > 50
    },
    {
      name: "Polarity Theme",
      src: polarityMusic,
      id: "polarity",
      condition: () => polarization > 50, // Se desbloquea cuando polarización > 50
    },
  ];

  // Seleccionar y reproducir pista
  const handleTrackSelection = (index) => {
    if (!unlockedTracks.includes(index)) return; // Evita seleccionar pistas bloqueadas
    setCurrentTrackIndex(index);
  };

  // Manejo de reproducción automática y volumen
  useEffect(() => {
    if (currentTrackIndex !== null && audioRef.current) {
      audioRef.current.src = tracks[currentTrackIndex].src;
      audioRef.current.play().catch((error) => {
        console.error("Error al reproducir la pista:", error);
      });
      audioRef.current.volume = isMusicMuted ? 0 : musicVolume / 100;
    }
  }, [currentTrackIndex, isMusicMuted, musicVolume]);

  // Manejar la interacción del usuario
  const handleUserInteraction = () => {
    if (!userInteracted) {
      setUserInteracted(true);
      setCurrentTrackIndex(0); // Comenzar con la primera pista desbloqueada
    }
  };

  // Configurar eventos de interacción del usuario
  useEffect(() => {
    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  }, [userInteracted]);

  // Evaluar desbloqueo de pistas al cambiar el estado del juego
  useEffect(() => {
    if (userInteracted) {
      evaluateTrackUnlock();
    }
  }, [economy, credibility, polarization, userInteracted]);

  // Evaluar y desbloquear nuevas pistas automáticamente
  const evaluateTrackUnlock = () => {
    const newUnlocked = [...unlockedTracks];
    let newTrackToPlay = null;

    tracks.forEach((track, i) => {
      if (track.condition && track.condition() && !newUnlocked.includes(i)) {
        newUnlocked.push(i);
        if (newTrackToPlay === null) {
          newTrackToPlay = i; // Guarda el índice de la primera nueva pista desbloqueada
        }
      }
    });

    // Si se desbloquea una nueva pista, cambia automáticamente
    if (newTrackToPlay !== null) {
      setCurrentTrackIndex(newTrackToPlay);
    }

    setUnlockedTracks(newUnlocked);
  };

  return (
    <div className="music-player-container">
      <audio ref={audioRef} autoPlay={false}></audio>
      <div className="music-player-track-list">
        <h4>Playlist</h4>
        <ul>
          {tracks.map((track, i) => (
            <li
              key={i}
              onClick={() => handleTrackSelection(i)}
              className={`track-item ${
                currentTrackIndex === i ? "active" : ""
              } ${unlockedTracks.includes(i) ? "" : "locked"}`}
            >
              {track.name} {unlockedTracks.includes(i) ? "" : "(Locked)"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MusicPlayer;
