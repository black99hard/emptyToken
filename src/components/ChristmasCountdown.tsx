import React, { useState, useEffect } from 'react';

const ChristmasCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const christmas = new Date(new Date().getFullYear(), 11, 25);
      const now = new Date();
      
      if (now > christmas) {
        christmas.setFullYear(christmas.getFullYear() + 1);
      }
      
      const difference = christmas.getTime() - now.getTime();
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      
      return `${days}d ${hours}h ${minutes}m until Christmas`;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 bg-black bg-opacity-50 px-4 py-2 rounded-lg text-sm text-gray-300">
      {timeLeft}
    </div>
  );
};

export default ChristmasCountdown; 