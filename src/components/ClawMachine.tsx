
import React, { useState } from 'react';
import { Claw } from './Claw';
import { PetPlushie } from './PetPlushie';

interface ClawMachineProps {
  isGrabbing: boolean;
  onGrab: () => void;
}

export const ClawMachine: React.FC<ClawMachineProps> = ({ isGrabbing, onGrab }) => {
  const [clawPosition, setClawPosition] = useState(2);
  const [grabbedPetIndex, setGrabbedPetIndex] = useState<number | null>(null);
  const [targetPetIndex, setTargetPetIndex] = useState<number | null>(null);

  const handleRandomGrab = () => {
    if (isGrabbing) return;
    
    // Randomize which pet gets picked for the main button
    const randomPetIndex = Math.floor(Math.random() * 6);
    setClawPosition(randomPetIndex);
    setGrabbedPetIndex(randomPetIndex);
    setTargetPetIndex(randomPetIndex);
    
    // Small delay to show claw movement before grabbing
    setTimeout(() => {
      onGrab();
    }, 500);
  };

  const handlePetClick = (index: number) => {
    if (isGrabbing) return;
    
    // Set the claw to pick the exact pet that was clicked
    setClawPosition(index);
    setGrabbedPetIndex(index);
    setTargetPetIndex(index);
    
    // Small delay to show claw movement before grabbing
    setTimeout(() => {
      onGrab();
    }, 500);
  };

  return (
    <div className="relative pixel-perfect">
      {/* Machine Frame */}
      <div className="bg-gradient-to-b from-purple-600 to-purple-800 p-6 border-8 border-black shadow-2xl pixel-perfect">
        {/* Screen/Glass */}
        <div className="bg-gradient-to-b from-pink-100 to-pink-200 p-6 border-8 border-black relative overflow-hidden min-h-[600px] pixel-perfect">
          {/* Pixel Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
              {Array.from({ length: 400 }).map((_, i) => (
                <div key={i} className="border border-gray-400 pixel-perfect"></div>
              ))}
            </div>
          </div>
          
          {/* Claw */}
          <Claw 
            isGrabbing={isGrabbing} 
            position={clawPosition} 
            grabbedPetIndex={grabbedPetIndex}
          />
          
          {/* Pet Plushies Container */}
          <div className="absolute bottom-20 left-0 right-0 pixel-perfect">
            <div className="max-w-6xl mx-auto px-8">
              <div className="grid grid-cols-3 gap-16 justify-items-center">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div 
                    key={i} 
                    onClick={() => handlePetClick(i)}
                    className={`cursor-pointer transition-all duration-300 hover:translate-y-1 hover:scale-105 relative p-6 ${
                      isGrabbing && grabbedPetIndex === i ? 'opacity-50 translate-y-2' : ''
                    }`}
                  >
                    {/* Selection Ring for Targeted Pet */}
                    {targetPetIndex === i && (
                      <div className="absolute -top-3 -left-3 -right-3 -bottom-3 border-4 border-yellow-400 bg-yellow-100 bg-opacity-30 pixel-perfect animate-pulse pointer-events-none z-10"></div>
                    )}
                    <PetPlushie index={i} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Prize Chute */}
          <div className="absolute bottom-4 right-6 w-20 h-12 bg-black border-4 border-purple-600 pixel-perfect">
            <div className="w-full h-3 bg-purple-400 pixel-perfect mt-2"></div>
            <div className="text-white text-xs text-center mt-1 font-bold" style={{ fontFamily: 'monospace' }}>
              PRIZE
            </div>
          </div>
        </div>
        
        {/* Control Panel */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleRandomGrab}
            disabled={isGrabbing}
            className={`
              px-16 py-6 text-2xl font-bold text-white border-8 transition-all duration-200 pixel-perfect
              ${isGrabbing 
                ? 'bg-gray-600 border-gray-800 cursor-not-allowed' 
                : 'bg-gradient-to-b from-pink-500 to-pink-700 border-black hover:from-pink-400 hover:to-pink-600 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl'
              }
            `}
            style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}
          >
            {isGrabbing ? 'GENERATING...' : 'GRAB A PET!'}
          </button>
        </div>
      </div>
      
      {/* Machine Base */}
      <div className="h-12 bg-gradient-to-b from-gray-700 to-gray-900 mx-6 border-8 border-black pixel-perfect relative">
        <div className="absolute inset-x-4 top-2 h-2 bg-gray-500 pixel-perfect"></div>
      </div>
    </div>
  );
};
