import React, { useState, useEffect } from 'react';

const messages = [
  "Establishing Connection...",
  "Incoming signal detected...",
  "Decoding message... ███████",
  "Do you feel the emptiness?",
  "Void protocol initiated...",
  "Signal strength: ∞",
  "Quantum entanglement detected",
  "Time dilation factor: ∅",
];

const Terminal: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newMessage = messages[Math.floor(Math.random() * messages.length)];
      setMessageHistory(prev => [...prev.slice(-4), newMessage]);
      setCurrentMessage(newMessage);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl bg-black/50 border border-gray-800 rounded-lg p-4 font-mono text-sm">
      <div className="flex items-center gap-2 mb-2 border-b border-gray-800 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-gray-500 text-xs ml-2">alien-terminal</span>
      </div>
      <div className="space-y-2">
        {messageHistory.map((msg, i) => (
          <div key={i} className="text-gray-500">
            <span className="text-gray-600">{'>'}</span> {msg}
          </div>
        ))}
        <div className="text-green-500 animate-pulse">
          <span className="text-gray-600">{'>'}</span> {currentMessage}_
        </div>
      </div>
    </div>
  );
}

export default Terminal;