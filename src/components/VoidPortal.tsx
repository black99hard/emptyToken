import React, { useEffect, useRef } from 'react';

const VoidPortal: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 200;
    canvas.height = 200;

    let frame = 0;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create spiral effect
      for (let i = 0; i < 360; i += 30) {
        const angle = (i + frame) * Math.PI / 180;
        const radius = Math.sin(frame * 0.02) * 50 + 50;
        const x = canvas.width / 2 + Math.cos(angle) * radius;
        const y = canvas.height / 2 + Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${i + frame}, 70%, 50%)`;
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50"
    />
  );
};

export default VoidPortal; 