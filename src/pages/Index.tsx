
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

  useEffect(() => {
    const savedFavorites = localStorage.getItem('claw-machine-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const generateAIPrize = async (petIndex: number): Promise<Prize> => {
    const contentTypes = ['poetry', 'quote', 'note'];
    const randomType = contentTypes[Math.floor(Math.random() * contentTypes.length)];
    
    setIsGenerating(true);
    
    try {
      console.log('🎯 Generating content for pet index:', petIndex, 'type:', randomType);
      
      const { data, error } = await supabase.functions.invoke('generate-love-content', {
        body: { type: randomType, petIndex: petIndex }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('✅ Generated content:', data);

      return {
        id: `ai-${Date.now()}-${Math.random()}`,
        type: randomType as 'poetry' | 'quote' | 'note',
        content: data.content,
        author: data.author,
        petIndex: petIndex
      };
    } catch (error) {
      console.error('❌ Error generating AI content:', error);
      
      // Enhanced fallback with pet-specific content
      const petFallbacks = [
        "A purr-fect moment of love! Your feline friend sends digital hugs! 🐱💖",
        "Loyal love from your digital pup! Woof-derful things await you! 🐶✨", 
        "Hop into happiness! Your bunny buddy believes you're amazing! 🐰🌟",
        "Clever and kind, just like a fox! Your spirit shines bright! 🦊💫",
        "Peaceful panda wisdom: You are loved beyond measure! 🐼💚",
        "Ribbit! Your frog friend says you're toad-ally awesome! 🐸🌈"
      ];
      
      return {
        id: `fallback-${Date.now()}`,
        type: 'note',
        content: petFallbacks[petIndex] || 'Something wonderful is waiting for you! Keep being amazing! ✨',
        petIndex: petIndex
      };
    } finally {
      setIsGenerating(false);
    }
  };

  const grabPrize = async () => {
    if (isGrabbing) return;
    
    setIsGrabbing(true);
    
    // Get the pet index from the claw machine
    const clawMachine = document.querySelector('[data-claw-position]');
    const petIndex = clawMachine ? parseInt(clawMachine.getAttribute('data-claw-position') || '0') : Math.floor(Math.random() * 6);
    
    console.log('🎯 Grabbing pet at index:', petIndex);
    setGrabbedPetIndex(petIndex);
    
    // Generate AI content while the claw is grabbing
    const aiPrizePromise = generateAIPrize(petIndex);
    
    // Simulate claw machine delay
    setTimeout(async () => {
      // Wait for AI content to be generated
      const aiPrize = await aiPrizePromise;
      setCurrentPrize(aiPrize);
      
      setIsGrabbing(false);
    }, 3000);
  };

  const saveFavorite = (prize: Prize) => {
    const newFavorites = [...favorites, prize];
    setFavorites(newFavorites);
    localStorage.setItem('claw-machine-favorites', JSON.stringify(newFavorites));
  };

  const closePrizeModal = () => {
    setCurrentPrize(null);
    setGrabbedPetIndex(null);
  };

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
