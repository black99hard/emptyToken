import React from 'react';
import { ExternalLink } from 'lucide-react';

const SocialLinks: React.FC = () => {
  const links = [
    { name: 'Telegram', url: 'https://t.me/emptinesscto' },
    { name: 'X (Twitter)', url: 'https://x.com/EmptinessCTO' },
    { name: 'Dev', url: 'https://t.me/Yakshustles'}
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
          <span>{link.name}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;