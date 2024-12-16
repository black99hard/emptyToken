import React, { useEffect, useRef } from 'react';

const Nebula: React.FC = () => {
  const nebulaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nebula = nebulaRef.current;
    if (!nebula) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 40;
      const y = (clientY / window.innerHeight - 0.5) * 40;
      
      nebula.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={nebulaRef} className="fixed inset-0 opacity-50 transition-transform duration-200">
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/30 via-transparent to-transparent animate-void-portal"></div>
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent animate-dimensional-rift" 
           style={{ transform: 'translate(30%, 20%)' }}></div>
      <div className="absolute inset-0 bg-gradient-radial from-cyan-900/25 via-transparent to-transparent animate-pulse"
           style={{ transform: 'translate(-20%, -30%)' }}></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/10 via-transparent to-transparent"
           style={{ transform: 'rotate(45deg)' }}></div>
    </div>
  );
};

export default Nebula;