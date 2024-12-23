import React, { useEffect, useState } from 'react';

interface TerminalLoaderProps {
  onConnected: () => void;
}

const TerminalLoader: React.FC<TerminalLoaderProps> = ({ onConnected }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    'Initializing void protocols...',
    'Establishing quantum tunnels...',
    'Calibrating dimensional frequencies...',
    'Synchronizing with the void...',
    'Connection established.'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onConnected, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    return () => clearInterval(timer);
  }, [onConnected]);

  useEffect(() => {
    const stepIndex = Math.min(
      Math.floor((progress / 100) * loadingSteps.length),
      loadingSteps.length - 1
    );
    setCurrentStep(stepIndex);
  }, [progress]);

  return (
    <div className="w-full max-w-2xl bg-black/90 border border-gray-800 rounded-lg p-4 font-mono text-sm">
      <div className="space-y-4">
        {loadingSteps.slice(0, currentStep + 1).map((step, index) => (
          <div 
            key={index}
            className={`text-${index === currentStep ? 'green' : 'gray'}-500`}
          >
            <span className="text-gray-600">{`>`}</span> {step}
          </div>
        ))}
        <div className="w-full bg-gray-900 rounded-full h-2 mt-4">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalLoader; 