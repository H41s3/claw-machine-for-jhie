
import React from 'react';

interface PixelHeartProps {
  delay?: number;
}

export const PixelHeart: React.FC<PixelHeartProps> = ({ delay = 0 }) => {
  const randomX = Math.random() * 100;
  const randomDuration = 2 + Math.random() * 3;
  
  return (
    <div
      className="absolute text-4xl animate-bounce"
      style={{
        left: `${randomX}%`,
        top: '100%',
        animationDelay: `${delay}ms`,
        animationDuration: `${randomDuration}s`,
        animationFillMode: 'forwards',
        transform: 'translateY(-100vh)',
      }}
    >
      💖
    </div>
  );
};
