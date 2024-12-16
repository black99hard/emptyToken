import React, { useEffect, useRef } from 'react';

const Stars: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      
      container.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none transition-transform duration-200">
      {[...Array(400)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            width: Math.random() * 3 + 'px',
            height: Math.random() * 3 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            transform: `translateZ(${Math.random() * 100}px)`,
            animationDelay: Math.random() * 5 + 's',
            animationDuration: Math.random() * 3 + 2 + 's',
          }}
        />
      ))}
    </div>
  );
};

export default Stars;