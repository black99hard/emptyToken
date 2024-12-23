import React, { useEffect, useRef } from 'react';

const VoidPortal: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isChristmasSeason = new Date().getMonth() === 11;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 300;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      angle: number;
      color: string;
      type: 'star' | 'snowflake' | 'ornament';
    }> = [];

    // Create initial particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 1,
        angle: Math.random() * Math.PI * 2,
        color: isChristmasSeason 
          ? ['#ff0000', '#00ff00', '#ffff00', '#ffffff'][Math.floor(Math.random() * 4)]
          : `hsl(${Math.random() * 360}, 70%, 50%)`,
        type: isChristmasSeason 
          ? ['star', 'snowflake', 'ornament'][Math.floor(Math.random() * 3)]
          : 'star'
      });
    }

    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
      ctx.beginPath();
      ctx.fillStyle = color;
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
        const x1 = x + Math.cos(angle) * size;
        const y1 = y + Math.sin(angle) * size;
        if (i === 0) ctx.moveTo(x1, y1);
        else ctx.lineTo(x1, y1);
      }
      ctx.closePath();
      ctx.fill();
    };

    const drawSnowflake = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(
          x + Math.cos(angle) * size,
          y + Math.sin(angle) * size
        );
        ctx.stroke();
      }
    };

    const drawOrnament = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      // Add shine
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.arc(x - size/3, y - size/3, size/4, 0, Math.PI * 2);
      ctx.fill();
    };

    let frame = 0;
    const animate = () => {
      frame++;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw void portal effect
      const gradient = ctx.createRadialGradient(
        canvas.width/2, canvas.height/2, 0,
        canvas.width/2, canvas.height/2, 100
      );
      gradient.addColorStop(0, isChristmasSeason ? 'rgba(255, 0, 0, 0.2)' : 'rgba(128, 128, 128, 0.2)');
      gradient.addColorStop(0.5, isChristmasSeason ? 'rgba(0, 255, 0, 0.1)' : 'rgba(64, 64, 64, 0.1)');
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(canvas.width/2, canvas.height/2, 100, 0, Math.PI * 2);
      ctx.fill();

      // Update and draw particles
      particles.forEach(particle => {
        particle.angle += 0.02;
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;

        // Reset particles that go off screen
        if (particle.x < 0 || particle.x > canvas.width || 
            particle.y < 0 || particle.y > canvas.height) {
          particle.x = canvas.width/2;
          particle.y = canvas.height/2;
          particle.angle = Math.random() * Math.PI * 2;
        }

        switch (particle.type) {
          case 'star':
            drawStar(ctx, particle.x, particle.y, particle.size, particle.color);
            break;
          case 'snowflake':
            drawSnowflake(ctx, particle.x, particle.y, particle.size * 2, particle.color);
            break;
          case 'ornament':
            drawOrnament(ctx, particle.x, particle.y, particle.size * 1.5, particle.color);
            break;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [isChristmasSeason]);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ opacity: 0.8, filter: 'blur(0.5px)' }}
    />
  );
};

export default VoidPortal; 