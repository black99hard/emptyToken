import React from 'react';
import { Send, Twitter, Code, ExternalLink, Terminal } from 'lucide-react';

const SocialLinks: React.FC = () => {

  const links = [
    { name: 'Telegram', url: 'https://t.me/emptinesscto', icon: Send },
    { name: 'X', url: 'https://x.com/EmptinessCTO', icon: Twitter },
    { name: 'Dev', url: 'https://t.me/Yakshustles', icon: Code },
    { name: 'Infinite Backrooms', url: 'https://www.infinitebackrooms.com/dreams/conversation-1713232205-scenario-vanilla-backrooms-txt', icon: Terminal }
  ];

  return (
    <div className="flex gap-4">
      {links.map((link) => (
      <a
        key={link.name}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 rounded-lg border border-gray-800 hover:bg-gray-800/50 transition-colors"
      >
        <link.icon className="w-4 h-4" />
        {link.name === 'Dev' && <span>{link.name}</span>}
      </a>
      ))}
    </div>
  );
};

export default SocialLinks;