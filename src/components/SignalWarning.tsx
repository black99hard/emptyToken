import React, { useState, useEffect } from 'react';

const SignalWarning: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [glitchText, setGlitchText] = useState(false);
  const [signalStrength, setSignalStrength] = useState(100);
  const [currentMessage, setCurrentMessage] = useState(0);

  const warningMessages = [
    {
      title: "VOID SIGNAL DISRUPTION",
      content: "⚠ WARNING: Detecting severe quantum interference patterns..."
    },
    {
      title: "SIGNAL DEGRADATION",
      content: "Terminal visuals experiencing dimensional shift. Maintain visual focus."
    },
    {
      title: "VOID TURBULENCE",
      content: "∆ Matrix destabilization detected. Visual artifacts are expected."
    },
    {
      title: "SIGNAL ADVISORY",
      content: "⌭ Reality anchors weakening. Prepare for void resonance."
    }
  ];

  useEffect(() => {
    // Signal strength degradation
    const signalInterval = setInterval(() => {
      setSignalStrength(prev => {
        const newStrength = prev - Math.random() * 15;
        return newStrength > 0 ? newStrength : 0;
      });
    }, 800);

    // Message rotation
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % warningMessages.length);
    }, 3000);

    // Glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.5) {
        setGlitchText(true);
        setTimeout(() => setGlitchText(false), 200);
      }
    }, 1000);

    // Disappear after 15 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 15000);

    return () => {
      clearInterval(signalInterval);
      clearInterval(messageInterval);
      clearInterval(glitchInterval);
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-md mx-auto px-2 sm:px-4">
      <div className={`
        bg-black/90 border border-red-800/50 rounded-lg p-3 sm:p-4 text-white 
        shadow-lg backdrop-blur-sm relative overflow-hidden text-sm sm:text-base
        ${glitchText ? 'glitch-effect' : ''}
      `}>
        {/* Scanning line effect */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500/50 animate-[scanline_2s_linear_infinite]" />
        
        {/* Signal strength indicator */}
        <div className="flex items-center justify-between mb-2 sm:mb-3 border-b border-red-800/30 pb-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-[3px] sm:w-1 transition-all duration-300 ${
                  signalStrength > i * 20 
                    ? 'bg-red-500' 
                    : 'bg-red-900'
                }`}
                style={{ height: `${4 + i * 2}px` }}
              />
            ))}
          </div>
          <span className="text-[10px] sm:text-xs text-red-500 font-mono">
            SIGNAL: {Math.round(signalStrength)}%
          </span>
        </div>

        {/* Warning content */}
        <div className={`space-y-1 sm:space-y-2 ${glitchText ? 'glitch-text' : ''}`}>
          <h3 className="text-base sm:text-lg font-bold flex items-center text-red-500">
            <span className="animate-pulse mr-2">⌭</span>
            {warningMessages[currentMessage].title}
          </h3>
          
          <p className="text-xs sm:text-sm opacity-90 font-mono leading-relaxed">
            {warningMessages[currentMessage].content}
          </p>

          <div className="text-[10px] sm:text-xs text-red-400/70 mt-2 font-mono">
            <span className="animate-pulse">▲</span> VOID.PROTOCOL//{Math.random().toString(16).slice(2, 8)}
          </div>
        </div>

        {/* Interference lines */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent opacity-30"
            style={{
              transform: `translateY(${Math.sin(Date.now() / 1000 + i) * 100}%)`,
              transition: 'transform 100ms linear',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SignalWarning; 