import React, { useState, useEffect } from 'react';

interface Props {
  onConnected: () => void;
}

const TerminalLoader: React.FC<Props> = ({ onConnected }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing quantum link...');
  const [scanLines, setScanLines] = useState<string[]>([]);
  const [currentSymbol, setCurrentSymbol] = useState(0);

  const statusMessages = [
    'Scanning void frequencies...',
    'Detecting dimensional rifts...',
    'Bypassing reality protocols...',
    'Establishing quantum entanglement...',
    'Calibrating void resonance...',
    'Synchronizing parallel timelines...',
    'Accessing interdimensional network...',
    'Validating void signatures...',
    'Stabilizing connection matrix...',
    'Terminal breach successful...'
  ];

  const voidSymbols = [
    `
     ▒█▀▀▄ █▀▀ ▀▀█▀▀ █▀▀ █▀▀ ▀▀█▀▀ ░▀░ █▀▀▄ █▀▀▀ 
     ▒█░▒█ █▀▀ ░░█░░ █▀▀ █░░ ░░█░░ ▀█▀ █░░█ █░▀█
     ▒█▄▄▀ ▀▀▀ ░░▀░░ ▀▀▀ ▀▀▀ ░░▀░░ ▀▀▀ ▀░░▀ ▀▀▀▀`,
    `
     ▓█▀▀▄ █▀▀ ▀▀█▀▀ █▀▀ █▀▀ ▀▀█▀▀ ░▀░ █▀▀▄ █▀▀▀
     ▓█░▒█ █▀▀ ░░█░░ █▀▀ █░░ ░░█░░ ▀█▀ █░░█ █░▀█
     ▓█▄▄▀ ▀▀▀ ░░▀░░ ▀▀▀ ▀▀▀ ░░▀░░ ▀▀▀ ▀░░▀ ▀▀▀▀`,
  ];

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(onConnected, 1000);
        return;
      }

      currentProgress += Math.random() * 15;
      currentProgress = Math.min(currentProgress, 100);
      setProgress(Math.floor(currentProgress));
      
      if (currentProgress > 0 && currentProgress % 10 === 0) {
        setStatus(statusMessages[Math.floor(currentProgress / 10) - 1]);
      }

      // Add random scan lines
      if (Math.random() > 0.7) {
        setScanLines(prev => [
          `${Math.random().toString(36).substring(2, 8)}: SIGNAL_${Math.floor(Math.random() * 999)}`,
          ...prev.slice(0, 5)
        ]);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const symbolInterval = setInterval(() => {
      setCurrentSymbol(prev => (prev + 1) % voidSymbols.length);
    }, 500);
    return () => clearInterval(symbolInterval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 text-gray-500 font-mono relative connection-sequence">
      <div className="mb-8 text-center">
        <h2 className="text-2xl mb-2 glitch-text">VOID TERMINAL v3.1.4</h2>
        <p className="text-sm text-gray-500">Establishing Connection...</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <div className="h-2 bg-black/50 rounded-full overflow-hidden border border-gray-900">
            <div 
              className="h-full bg-gray-500 transition-all duration-300 progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="absolute right-0 top-4 text-sm">{progress}%</span>
        </div>

        <div className="text-sm">
          <p className="animate-pulse">{status}</p>
          <div className="mt-4 space-y-1 h-32 overflow-hidden">
            {scanLines.map((line, i) => (
              <div 
                key={i}
                className="text-xs text-gray-500"
                style={{
                  opacity: 1 - (i * 0.2),
                  transform: `translateX(${Math.random() * 10 - 5}px)`
                }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>

        <div className="signal-waves">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className="wave"
              style={{ 
                animationDelay: `${i * 0.2}s`,
                opacity: 0.3 + (i * 0.2)
              }} 
            />
          ))}
        </div>

        <pre className="text-xs mb-4 animate-pulse text-green-500">
          {voidSymbols[currentSymbol]}
        </pre>
      </div>
    </div>
  );
};

export default TerminalLoader; 