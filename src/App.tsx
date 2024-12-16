import React from 'react';
import { Orbit } from 'lucide-react';
import Background from './components/Background';
import Terminal from './components/Terminal';
import ContractAddress from './components/ContractAddress';
import SocialLinks from './components/SocialLinks';

function App() {
  return (
    <div className="relative min-h-screen bg-black text-gray-100 overflow-hidden">
      <Background />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-4xl mx-auto w-full space-y-12">
          <div className="text-center space-y-8">
            <div className="animate-float">
            <h1 className="text-9xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 tracking-tighter">∅</h1>

            </div>

            <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 tracking-tighter">
              EMPTINESS
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Where nothingness becomes everything. A void that contains infinite possibilities,
              drawing you into its mysterious depths like a cosmic black hole.
            </p>
          </div>

          <Terminal />
          
          <div className="space-y-6">
            <ContractAddress />
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