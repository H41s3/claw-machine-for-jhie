
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  favoritesCount: number;
}

export const Header: React.FC<HeaderProps> = ({ favoritesCount }) => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-8 pixel-perfect">
      <h1 
        className="text-6xl font-bold text-black bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 bg-clip-text text-transparent mb-4 animate-pulse pixel-perfect"
        style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}
      >
        🐾 This One's Yours 🐾
      </h1>
      
      <p 
        className="text-xl text-pink-800 mb-4 pixel-perfect"
        style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}
      >
        Every bit of this is yours.
      </p>
      
      <button
        onClick={() => navigate('/favorites')}
        className="inline-block bg-gradient-to-r from-pink-400 to-pink-600 text-black px-6 py-2 border-4 border-black pixel-perfect hover:from-pink-300 hover:to-pink-500 hover:scale-105 transition-all duration-200 cursor-pointer"
      >
        <span className="font-bold" style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}>
          ⭐ FAVORITES: {favoritesCount}
        </span>
      </button>
    </div>
  );
};
