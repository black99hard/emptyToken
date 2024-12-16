import React, { useState, useEffect, useRef } from 'react';

const VoidAmbience: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const createVoidSound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      
      // Create oscillator for base drone
      oscillatorRef.current = audioContextRef.current.createOscillator();
      oscillatorRef.current.type = 'sine';
      oscillatorRef.current.frequency.setValueAtTime(50, audioContextRef.current.currentTime);

      // Create gain node for volume control
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.gain.setValueAtTime(0.15, audioContextRef.current.currentTime);

      // Connect nodes
      oscillatorRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(audioContextRef.current.destination);

      // Start oscillator
      oscillatorRef.current.start();

      // Add subtle frequency modulation
      setInterval(() => {
        if (oscillatorRef.current && Math.random() > 0.7) {
          const newFreq = 40 + Math.random() * 20;
          oscillatorRef.current.frequency.exponentialRampToValueAtTime(
            newFreq,
            audioContextRef.current!.currentTime + 2
          );
        }
      }, 3000);
    }
  };

  const toggleSound = () => {
    if (!isPlaying) {
      createVoidSound();
      setIsPlaying(true);
    } else {
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.setValueAtTime(0, audioContextRef.current!.currentTime);
      }
      setIsPlaying(false);
    }
  };

  return (
    <button
      onClick={toggleSound}
      className={`fixed bottom-4 right-4 z-50 p-3 rounded-full backdrop-blur-sm transition-all duration-300
        ${isPlaying 
          ? 'bg-red-900/50 border-red-500/50' 
          : 'bg-gray-900/50 border-gray-500/50'} 
        border hover:scale-110`}
    >
      {isPlaying ? (
        <span className="text-red-500 animate-pulse">◉</span>
      ) : (
        <span className="text-gray-500">◎</span>
      )}
    </button>
  );
};

export default VoidAmbience; 