import React, { useState, useEffect } from 'react';
import { ClawMachine } from '../components/ClawMachine';
import { PrizeModal } from '../components/PrizeModal';
import { Header } from '../components/Header';
import { supabase } from '../integrations/supabase/client';

export interface Prize {
  id: string;
  type: 'poetry' | 'quote' | 'note';
  content: string;
  author?: string;
  petIndex?: number;
}

const Index = () => {
  const [currentPrize, setCurrentPrize] = useState<Prize | null>(null);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [favorites, setFavorites] = useState<Prize[]>([]);
  const [grabbedPetIndex, setGrabbedPetIndex] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Index component mounted');
    try {
      const savedFavorites = localStorage.getItem('claw-machine-favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (err) {
      console.error('Error loading favorites:', err);
    }
  }, []);

  const generateAIPrize = async (petIndex: number): Promise<Prize> => {
    const contentTypes = ['poetry', 'quote', 'note'];
    const randomType = contentTypes[Math.floor(Math.random() * contentTypes.length)];
    
    setIsGenerating(true);
    
    try {
      console.log('🎯 Generating content for pet index:', petIndex, 'type:', randomType);
      
      // Try to use Supabase, but fallback if it fails
      try {
        const { data, error } = await supabase.functions.invoke('generate-love-content', {
          body: { 
            type: randomType, 
            petIndex: petIndex,
            timestamp: Date.now(),
            randomSeed: Math.random()
          }
        });

        if (error) {
          console.error('Supabase function error:', error);
          throw error;
        }

        console.log('✅ Generated content:', data);

        return {
          id: `ai-${Date.now()}-${Math.random()}-${petIndex}`,
          type: randomType as 'poetry' | 'quote' | 'note',
          content: data.content,
          author: data.author,
          petIndex: petIndex
        };
      } catch (supabaseError) {
        console.error('Supabase failed, using fallback:', supabaseError);
        throw supabaseError; // This will trigger the fallback below
      }
    } catch (error) {
      console.error('❌ Error generating AI content:', error);
      
      // Enhanced fallback with romantic content - randomized each time
      const romanticFallbacks = [
        "A perfect moment of love! Your man sends digital hugs! 💖✨",
        "Loyal love from your sweetheart! Wonderful things await you! 💕🌟", 
        "Jump into happiness! Your love believes you're amazing! 💫💖",
        "Clever and kind, just like your heart! Your spirit shines bright! 💎✨",
        "Peaceful wisdom: You are loved beyond measure! 💚💕",
        "Sweet! Your love says you're absolutely awesome! 💖🌈",
        "Your heart radiates pure joy and love! 💕✨",
        "Magic happens when you smile! Your love adores you! 🌟💖",
        "You're a treasure beyond compare! Sending warm hugs! 🤗💎",
        "Your kindness lights up the world! So proud of you! 💫💕",
        "Dream big, beautiful soul! Your love supports you always! 🌈💖",
        "Every day with you is a gift! You're absolutely wonderful! 🎁✨",
        "Your strength inspires everyone around you! Amazing! 💪💕",
        "Sunshine and rainbows follow you everywhere! So loved! ☀️🌈",
        "Your laughter is music to the heart! Keep shining! 🎵💖",
        "Adventure awaits, brave heart! Your love believes in you! 🗺️💫",
        "You make the world a better place just by being you! 🌍💕",
        "Sweet dreams are made of moments like these! So special! 💤✨",
        "Your love story is just beginning! Exciting times ahead! 📖💖",
        "Every challenge makes you stronger! You're incredible! 💪🌟"
      ];
      
      // Pick a truly random message instead of using petIndex
      const randomIndex = Math.floor(Math.random() * romanticFallbacks.length);
      
      return {
        id: `fallback-${Date.now()}-${Math.random()}`,
        type: 'note',
        content: romanticFallbacks[randomIndex],
        petIndex: petIndex
      };
    } finally {
      setIsGenerating(false);
    }
  };

  const grabPrize = async () => {
    if (isGrabbing) return;
    
    setIsGrabbing(true);
    setError(null);
    
    try {
      // Get the pet index from the claw machine
      const clawMachine = document.querySelector('[data-claw-position]');
      const petIndex = clawMachine ? parseInt(clawMachine.getAttribute('data-claw-position') || '0') : Math.floor(Math.random() * 6);
      
      console.log('🎯 Grabbing pet at index:', petIndex);
      setGrabbedPetIndex(petIndex);
      
      // Generate AI content while the claw is grabbing
      const aiPrizePromise = generateAIPrize(petIndex);
      
      // Simulate claw machine delay
      setTimeout(async () => {
        try {
          // Wait for AI content to be generated
          const aiPrize = await aiPrizePromise;
          setCurrentPrize(aiPrize);
        } catch (err) {
          console.error('Error in grabPrize:', err);
          setError('Failed to generate prize content');
        } finally {
          setIsGrabbing(false);
        }
      }, 3000);
    } catch (err) {
      console.error('Error in grabPrize:', err);
      setError('Failed to grab prize');
      setIsGrabbing(false);
    }
  };

  const saveFavorite = (prize: Prize) => {
    try {
      const newFavorites = [...favorites, prize];
      setFavorites(newFavorites);
      localStorage.setItem('claw-machine-favorites', JSON.stringify(newFavorites));
    } catch (err) {
      console.error('Error saving favorite:', err);
    }
  };

  const closePrizeModal = () => {
    setCurrentPrize(null);
    setGrabbedPetIndex(null);
    setError(null);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-300 via-pink-500 to-pink-700 p-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-white text-xl mb-4">Error: {error}</div>
          <button 
            onClick={() => setError(null)}
            className="bg-white text-pink-600 px-4 py-2 rounded-lg hover:bg-pink-100"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-300 via-pink-500 to-pink-700 p-4 pixel-perfect">
      <div className="max-w-4xl mx-auto">
        <Header favoritesCount={favorites.length} />
        
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
          <ClawMachine 
            isGrabbing={isGrabbing || isGenerating}
            onGrab={grabPrize}
          />
        </div>

        {currentPrize && (
          <PrizeModal
            prize={currentPrize}
            onClose={closePrizeModal}
            onSaveFavorite={saveFavorite}
            isFavorite={favorites.some(fav => fav.id === currentPrize.id)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
