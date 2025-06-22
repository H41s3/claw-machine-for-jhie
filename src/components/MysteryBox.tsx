
import React from 'react';

export const MysteryBox: React.FC = () => {
  return (
    <div className="w-12 h-12 bg-gradient-to-b from-pink-400 to-pink-600 border-4 border-pink-800 rounded-lg relative">
      {/* Question Mark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white text-xl font-bold" style={{ fontFamily: 'monospace' }}>?</span>
      </div>
      
      {/* Sparkle Effect */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rotate-45 animate-pulse"></div>
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-yellow-300 rotate-45 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
    </div>
  );
};
