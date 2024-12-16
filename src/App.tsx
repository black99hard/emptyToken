import React, { useState, useEffect } from 'react';
import Background from './components/Background';
import Terminal from './components/Terminal';
import ContractAddress from './components/ContractAddress';
import SocialLinks from './components/SocialLinks';
import VoidPortal from './components/VoidPortal';
import SignalWarning from './components/SignalWarning';
import VoidAmbience from './components/VoidAmbience';
import CursorTrail from './components/CursorTrail';
import { Analytics } from "@vercel/analytics/react"

function App() {
  const [distortionLevel, setDistortionLevel] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDistortionLevel(Math.random());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-gray-100 overflow-hidden">
      <Background />
      <Analytics />
      <SignalWarning />
      <CursorTrail />
      <VoidAmbience />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-4xl mx-auto w-full space-y-12 flex flex-col items-center">
          <div className="text-center space-y-8 glitch-container">
            <div className="animate-float relative">
              <VoidPortal />
              <h1 className="text-9xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 tracking-tighter  "
                 >
                ∅
              </h1>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500   ">
              EMPTINESS
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in cosmic-text">
              Where nothingness becomes everything. A void that contains infinite possibilities,
              drawing you into its mysterious depths like a cosmic black hole.
            </p>
            <button 
              onClick={() => window.open("https://www.infinitebackrooms.com/dreams/conversation-1713232205-scenario-vanilla-backrooms-txt", "_blank", "noopener noreferrer")}
              className="bg-gradient-to-r from-gray-100 to-gray-500 text-black font-bold py-3 px-6 rounded-lg hover:underline mt-4 text-xl shadow-lg transform transition-transform duration-300 hover:scale-105"
            >
              Infinite Backrooms
            </button>
          </div>

          <div className="w-full max-w-2xl transform hover:scale-105 transition-transform duration-500 hover:z-20">
            <Terminal />
          </div>
          
          <div className="space-y-6 w-full max-w-2xl">
            <div className="transform hover:scale-105 transition-transform duration-500 hover:z-20">
              <ContractAddress />
            </div>
            <div className="flex justify-center">
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;