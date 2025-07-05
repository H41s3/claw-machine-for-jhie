
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Prize } from './Index';
import { PetPlushie } from '../components/PetPlushie';

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = React.useState<Prize[]>([]);

  React.useEffect(() => {
    const savedFavorites = localStorage.getItem('claw-machine-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const removeFavorite = (prizeId: string) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== prizeId);
    setFavorites(updatedFavorites);
    localStorage.setItem('claw-machine-favorites', JSON.stringify(updatedFavorites));
  };

  const getPrizeTypeColor = (type: string) => {
    switch (type) {
      case 'poetry': return 'from-purple-600 to-purple-800';
      case 'quote': return 'from-pink-600 to-pink-800';
      case 'note': return 'from-red-600 to-red-800';
      default: return 'from-gray-600 to-gray-800';
    }
  };

  const getPrizeTypeLabel = (type: string) => {
    switch (type) {
      case 'poetry': return '📝 ILY';
      case 'quote': return '💫 ENCHANTED';
      case 'note': return '💌 MY BB';
      default: return '🎁 PRIZE';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-300 via-pink-500 to-pink-700 p-4 pixel-perfect">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center py-8 pixel-perfect">
          <h1 
            className="text-6xl font-bold text-black bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 bg-clip-text text-transparent mb-4 animate-pulse pixel-perfect"
            style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}
          >
            ⭐ YOUR FAVORITES ⭐
          </h1>
          
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-gradient-to-b from-pink-500 to-pink-700 border-4 border-black text-white font-bold hover:from-pink-400 hover:to-pink-600 hover:scale-105 transition-all duration-200 pixel-perfect mb-8"
            style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}
          >
            ← BACK TO CLAW MACHINE
          </button>
        </div>

        {/* Favorites Grid */}
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white border-8 border-black p-12 pixel-perfect inline-block">
              <p 
                className="text-2xl text-gray-600 mb-4" 
                style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}
              >
                No favorites yet! 😢
              </p>
              <p 
                className="text-lg text-gray-500" 
                style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}
              >
                Go grab some pets to save your favorite prizes!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((prize) => (
              <div 
                key={prize.id}
                className="bg-gradient-to-b from-pink-100 to-pink-200 border-8 border-black p-6 shadow-xl pixel-perfect hover:scale-105 transition-all duration-300"
              >
                {/* Prize Pet */}
                {prize.petIndex !== undefined && (
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-b from-pink-400 to-pink-600 border-4 border-black relative pixel-perfect flex items-center justify-center">
                      <div className="scale-125">
                        <PetPlushie index={prize.petIndex} />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Prize Type Badge */}
                <div className={`inline-block bg-gradient-to-r ${getPrizeTypeColor(prize.type)} text-white px-3 py-1 border-4 border-black mb-4 pixel-perfect`}>
                  <span className="font-bold text-xs" style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}>
                    {getPrizeTypeLabel(prize.type)}
                  </span>
                </div>
                
                {/* Prize Content */}
                <div className="bg-white border-4 border-black p-4 mb-4 pixel-perfect">
                  <p className="text-gray-800 text-sm leading-relaxed" style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}>
                    "{prize.content}"
                  </p>
                  {prize.author && (
                    <p className="text-gray-600 text-right mt-2 italic text-xs" style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}>
                      - {prize.author}
                    </p>
                  )}
                </div>
                
                {/* Remove Button */}
                <button
                  onClick={() => removeFavorite(prize.id)}
                  className="w-full px-4 py-2 bg-gradient-to-b from-red-500 to-red-700 border-4 border-black text-white font-bold hover:from-red-400 hover:to-red-600 hover:scale-105 transition-all duration-200 pixel-perfect"
                  style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}
                >
                  REMOVE ❌
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
