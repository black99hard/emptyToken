import React, { useEffect } from 'react';

const ChristmasSnow: React.FC = () => {
  useEffect(() => {
    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.style.left = Math.random() * window.innerWidth + 'px';
      snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
      snowflake.style.opacity = (Math.random() * 0.6 + 0.2).toString();
      snowflake.innerHTML = '❄';
      document.getElementById('snow-container')?.appendChild(snowflake);

      setTimeout(() => {
        snowflake.remove();
      }, 5000);
    };

    const snowInterval = setInterval(createSnowflake, 200);

    return () => clearInterval(snowInterval);
  }, []);

  return (
    <div 
      id="snow-container" 
      className="fixed inset-0 pointer-events-none z-20"
      style={{ 
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '10px'
      }}
    />
  );
};

export default ChristmasSnow; 