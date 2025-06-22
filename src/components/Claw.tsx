
import React from 'react';
import { PetPlushie } from './PetPlushie';

interface ClawProps {
  isGrabbing: boolean;
  position: number;
  grabbedPetIndex?: number | null;
}

export const Claw: React.FC<ClawProps> = ({ isGrabbing, position, grabbedPetIndex }) => {
  // Calculate horizontal position for the 3x2 grid layout
  const getClawPosition = (petIndex: number) => {
    const col = petIndex % 3; // 0, 1, 2
    const row = Math.floor(petIndex / 3); // 0 or 1
    
    // Calculate position based on grid layout with proper spacing
    const leftPadding = 8; // Container padding percentage
    const rightPadding = 8;
    const availableWidth = 100 - leftPadding - rightPadding;
    const colWidth = availableWidth / 3;
    const petCenterX = leftPadding + (col * colWidth) + (colWidth / 2);
    
    return petCenterX;
  };

  const leftPosition = getClawPosition(position);

  return (
    <div 
      className="absolute top-6 transition-all duration-700 pixel-perfect z-20"
      style={{ left: `${leftPosition}%`, transform: 'translateX(-50%)' }}
      data-claw-position={position}
    >
      {/* Claw Cable */}
      <div 
        className={`w-3 bg-gray-900 mx-auto transition-all duration-1000 pixel-perfect ${
          isGrabbing ? 'h-96' : 'h-20'
        }`}
      ></div>
      
      {/* Claw Head */}
      <div 
        className={`relative transition-all duration-1000 pixel-perfect ${
          isGrabbing ? 'translate-y-96' : 'translate-y-0'
        }`}
      >
        {/* Claw Mechanism */}
        <div className="w-12 h-10 bg-gradient-to-b from-gray-500 to-gray-700 border-4 border-black mx-auto pixel-perfect"></div>
        
        {/* Claw Arms */}
        <div className="flex justify-center mt-1 pixel-perfect">
          <div 
            className={`w-5 h-12 bg-gradient-to-b from-yellow-500 to-yellow-700 border-4 border-black transform transition-transform duration-500 pixel-perfect ${
              isGrabbing ? 'rotate-12 translate-x-1' : 'rotate-45 translate-x-2'
            }`}
            style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)' }}
          ></div>
          <div 
            className={`w-5 h-12 bg-gradient-to-b from-yellow-500 to-yellow-700 border-4 border-black transform transition-transform duration-500 pixel-perfect ${
              isGrabbing ? '-rotate-12 -translate-x-1' : '-rotate-45 -translate-x-2'
            }`}
            style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)' }}
          ></div>
        </div>
        
        {/* Grabbed Pet */}
        {isGrabbing && grabbedPetIndex !== null && (
          <div className="absolute top-14 left-1/2 transform -translate-x-1/2 scale-75 opacity-90 z-10">
            <PetPlushie index={grabbedPetIndex} />
          </div>
        )}
      </div>
    </div>
  );
};
