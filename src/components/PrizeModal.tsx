
import React, { useState } from 'react';
import { Prize } from '../pages/Index';
import { PixelHeart } from './PixelHeart';
import { PetPlushie } from './PetPlushie';

interface PrizeModalProps {
  prize: Prize;
  onClose: () => void;
  onSaveFavorite: (prize: Prize) => void;
  isFavorite: boolean;
}

export const PrizeModal: React.FC<PrizeModalProps> = ({ 
  prize, 
  onClose, 
  onSaveFavorite, 
  isFavorite 
}) => {
  const [showConfetti, setShowConfetti] = useState(true);

  const handleSaveFavorite = () => {
    if (!isFavorite) {
      onSaveFavorite(prize);
      setShowConfetti(true);
    }
  };

  const getPrizeTypeColor = () => {
    switch (prize.type) {
      case 'poetry': return 'from-purple-600 to-purple-800';
      case 'quote': return 'from-pink-600 to-pink-800';
      case 'note': return 'from-red-600 to-red-800';
    }
  };

  const getPrizeTypeLabel = () => {
    switch (prize.type) {
      case 'poetry': return '📝 PET POETRY';
      case 'quote': return '💫 SWEET QUOTE';
      case 'note': return '💌 LOVE NOTE';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 pixel-perfect">
      {/* Confetti Hearts */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <PixelHeart key={i} delay={i * 100} />
          ))}
        </div>
      )}
      
      <div className="bg-gradient-to-b from-pink-100 to-pink-200 border-8 border-black p-8 max-w-lg w-full shadow-2xl animate-scale-in pixel-perfect">
        {/* Prize Pet Animation */}
        <div className="text-center mb-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-b from-pink-400 to-pink-600 border-8 border-black relative animate-pulse pixel-perfect flex items-center justify-center">
            {prize.petIndex !== undefined ? (
              <div className="scale-150">
                <PetPlushie index={prize.petIndex} />
              </div>
            ) : (
              <span className="text-white text-4xl font-bold" style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}>🎁</span>
            )}
          </div>
        </div>
        
        {/* Prize Type Badge */}
        <div className={`inline-block bg-gradient-to-r ${getPrizeTypeColor()} text-white px-4 py-2 border-4 border-black mb-4 pixel-perfect`}>
          <span className="font-bold text-sm" style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}>
            {getPrizeTypeLabel()}
          </span>
        </div>
        
        {/* Prize Content */}
        <div className="bg-white border-4 border-black p-6 mb-6 pixel-perfect">
          <p className="text-gray-800 text-lg leading-relaxed" style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}>
            "{prize.content}"
          </p>
          {prize.author && (
            <p className="text-gray-600 text-right mt-4 italic" style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}>
              - {prize.author}
            </p>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleSaveFavorite}
            disabled={isFavorite}
            className={`
              px-6 py-3 border-4 font-bold transition-all duration-200 pixel-perfect
              ${isFavorite 
                ? 'bg-gray-400 border-black text-gray-700 cursor-not-allowed' 
                : 'bg-gradient-to-b from-pink-500 to-pink-700 border-black text-white hover:from-pink-400 hover:to-pink-600 hover:scale-105'
              }
            `}
            style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}
          >
            {isFavorite ? 'SAVED! ⭐' : 'SAVE TO FAVORITES'}
          </button>
          
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-b from-gray-600 to-gray-800 border-4 border-black text-white font-bold hover:from-gray-500 hover:to-gray-700 hover:scale-105 transition-all duration-200 pixel-perfect"
            style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
