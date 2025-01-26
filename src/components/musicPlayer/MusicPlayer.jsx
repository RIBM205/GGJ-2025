import React, { useEffect, useRef, useState } from "react";
import mainMusic from "../../music/Main.wav";

const MusicPlayer = ({
  economy,
  credibility,
  polarization, 
  isMusicMuted,
  musicVolume
}) => {
  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [unlockedTracks, setUnlockedTracks] = useState([0]);
  const [userInteracted, setUserInteracted] = useState(false);

  const tracks = [
    { name: "Neutral Theme", src: mainMusic, id: "neutral" },
    // Add more tracks here as needed
  ];

  // Handle track selection by the user
  const handleTrackSelection = (index) => {
    if (!unlockedTracks.includes(index)) return;
    setCurrentTrackIndex(index);
    if (audioRef.current) {
      audioRef.current.src = tracks[index].src;
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      audioRef.current.volume = 0.5;
    }
  };

  // Handle user interaction to start playing music
  const handleUserInteraction = () => {
    if (!userInteracted) {
      setUserInteracted(true);
      if (audioRef.current && tracks[0]) {
        audioRef.current.src = tracks[0].src;
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio after interaction:", error);
        });
        audioRef.current.volume = 0.5;
      }
    }
  };

  // Set up event listeners for user interactions
  useEffect(() => {
    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  }, [userInteracted]);

  // Evaluate and unlock tracks based on current state
  useEffect(() => {
    if (userInteracted) {
      evaluateTrackUnlock();
    }
  }, [economy, credibility, polarization, userInteracted]);

  // Set initial volume based on mute state and volume level
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMusicMuted ? 0 : musicVolume / 100;
      audioRef.current.muted = isMusicMuted; // Ensure mute works correctly
    }
  }, [musicVolume, isMusicMuted]);

  // Function to evaluate and unlock new tracks
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
