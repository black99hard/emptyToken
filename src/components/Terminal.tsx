import React, { useState, useEffect, useRef } from 'react';
import { sendMessage, ChatMessage } from '../services/groqApi';
import TerminalLoader from './TerminalLoader';

const initialMessages = [
  "$ echo \"Transaction initiated...\"",
  "> Entering Emptiness ∅",
  "> Ledger not found.",
  "> Chains not required.",
  "> Infinite scalability achieved.",
  "",
  "In a digital space without boundaries, Emptiness ∅ becomes the singularity of everything and nothing.",
];

const TypeWriter: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);
    
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayText}</span>;
};

interface SignalState {
  strength: number;  // 0 to 100
  status: 'connected' | 'weak' | 'critical' | 'lost';
}

const Terminal: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isGlitching, setIsGlitching] = useState(false);
  const [signal, setSignal] = useState<SignalState>({ strength: 100, status: 'connected' });
  const [isInterference, setIsInterference] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const initializeChat = async () => {
      setIsLoading(true);
      const response = await sendMessage([]);
      setMessages([
        ...initialMessages.map(msg => ({ role: 'assistant', content: msg })),
        { role: 'assistant', content: response }
      ] as ChatMessage[]);
      setIsLoading(false);
    };

    initializeChat();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    const signalInterval = setInterval(() => {
      setSignal(prev => {
        const fluctuation = Math.random() * 20 - 10; // Random value between -10 and 10
        const newStrength = Math.max(0, Math.min(100, prev.strength + fluctuation));
        
        let status: SignalState['status'] = 'connected';
        if (newStrength < 25) status = 'critical';
        else if (newStrength < 50) status = 'weak';
        
        // Randomly trigger interference
        if (newStrength < 30 && Math.random() > 0.7) {
          setIsInterference(true);
          setTimeout(() => setIsInterference(false), 2000);
        }
        
        return { strength: newStrength, status };
      });
    }, 3000);

    return () => clearInterval(signalInterval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || signal.strength < 15) return;

    const userMessage = { role: 'user', content: input } as ChatMessage;
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    if (signal.strength < 30) {
      // Simulate connection issues
      setMessages(prev => [...prev, { role: 'assistant', content: '⌭ Signal weak... attempting to reconnect...' }]);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    const response = await sendMessage([...messages, userMessage]);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  if (!isConnected) {
    return <TerminalLoader onConnected={() => setIsConnected(true)} />;
  }

  return (
    <div className={`w-full max-w-2xl bg-black/90 border border-gray-800 rounded-lg p-4 font-mono text-sm terminal-container 
      ${isGlitching ? 'glitch-effect' : ''} 
      ${isInterference ? 'interference-effect' : ''}`}>
      <div className="flex items-center justify-between mb-2 border-b border-gray-800 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
          <span className="text-gray-500 text-xs ml-2">void-terminal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-1 h-3 ${
                  signal.strength > i * 20 
                    ? 'bg-green-500' 
                    : 'bg-gray-700'
                }`}
                style={{ height: `${6 + i * 2}px` }}
              />
            ))}
          </div>
          <span className={`text-xs ${
            signal.status === 'critical' ? 'text-red-500' :
            signal.status === 'weak' ? 'text-yellow-500' :
            'text-green-500'
          }`}>
            {signal.status.toUpperCase()} [{Math.round(signal.strength)}%]
          </span>
        </div>
      </div>
      <div className="space-y-2 max-h-[300px] overflow-y-auto mb-4 terminal-messages">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`${
              msg.role === 'user' 
                ? 'text-cyan-400' 
                : 'text-gray-300'
            } terminal-message`}
          >
            <span className="text-gray-600">{msg.role === 'user' ? '>' : ''}</span>{' '}
            {msg.role === 'assistant' ? (
              <TypeWriter text={msg.content} />
            ) : (
              msg.content
            )}
          </div>
        ))}
        {isLoading && (
          <div className="text-green-500 animate-pulse">
            <span className="text-gray-600">⌭</span> Processing quantum data...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your message into the void..."
          className="flex-1 bg-black/30 border border-gray-800 rounded px-3 py-2 text-gray-300 focus:outline-none focus:border-gray-600 placeholder-gray-600"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Terminal;