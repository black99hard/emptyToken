import React, { useState, useEffect, useRef } from 'react';
import { sendMessage, ChatMessage } from '../services/groqApi';

const initialMessages = [
  "∇ Initiating void protocol...",
  "⌭ Reality distortion detected",
  "◎ Establishing neural link...",
];

// Add typing animation effect
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

const Terminal: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isGlitching, setIsGlitching] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Initialize with system messages
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

  // Add random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input } as ChatMessage;
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await sendMessage([...messages, userMessage]);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className={`w-full max-w-2xl bg-black/50 border border-gray-800 rounded-lg p-4 font-mono text-sm terminal-container ${isGlitching ? 'glitch-effect' : ''}`}>
      <div className="flex items-center gap-2 mb-2 border-b border-gray-800 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-gray-500 text-xs ml-2">void-terminal</span>
      </div>
      
      <div className="space-y-2 max-h-[300px] overflow-y-auto mb-4 terminal-messages">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`${
              msg.role === 'user' 
                ? 'text-cyan-400' 
                : 'text-green-500'
            } terminal-message`}
          >
            <span className="text-gray-600">{msg.role === 'user' ? '>' : '⌭'}</span>{' '}
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