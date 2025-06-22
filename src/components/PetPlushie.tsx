
import React from 'react';

interface PetPlushieProps {
  index: number;
}

export const PetPlushie: React.FC<PetPlushieProps> = ({ index }) => {
  const pets = [
    { name: 'Pixel Cat', colors: 'from-orange-400 to-orange-600', accent: 'pink-500' },
    { name: 'Cyber Pup', colors: 'from-brown-400 to-brown-600', accent: 'pink-400' },
    { name: 'Bunny Bot', colors: 'from-gray-300 to-gray-500', accent: 'pink-500' },
    { name: 'Fox Friend', colors: 'from-red-400 to-red-600', accent: 'white' },
    { name: 'Panda Pal', colors: 'from-gray-100 to-gray-300', accent: 'black' },
    { name: 'Frog Buddy', colors: 'from-green-400 to-green-600', accent: 'yellow-400' }
  ];
  
  const pet = pets[index % pets.length];
  
  const renderPetFace = () => {
    const eyeClass = "absolute w-2 h-2 bg-black pixel-perfect";
    const noseClass = `absolute w-1 h-1 bg-${pet.accent} pixel-perfect`;
    const mouthClass = "absolute bg-black pixel-perfect";
    
    switch (index) {
      case 0: // Cat
        return (
          <>
            <div className={`${eyeClass} top-3 left-3`}></div>
            <div className={`${eyeClass} top-3 right-3`}></div>
            <div className={`${noseClass} top-5 left-1/2 transform -translate-x-1/2`}></div>
            <div className={`${mouthClass} top-6 left-1/2 transform -translate-x-1/2 w-3 h-0.5`}></div>
            {/* Cat ears */}
            <div className="absolute -top-2 left-2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-orange-500 pixel-perfect"></div>
            <div className="absolute -top-2 right-2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-orange-500 pixel-perfect"></div>
          </>
        );
      case 1: // Dog
        return (
          <>
            <div className={`${eyeClass} top-3 left-3`}></div>
            <div className={`${eyeClass} top-3 right-3`}></div>
            <div className={`${noseClass} top-5 left-1/2 transform -translate-x-1/2`}></div>
            <div className={`${mouthClass} top-6 left-1/2 transform -translate-x-1/2 w-4 h-0.5`}></div>
            <div className={`${mouthClass} top-7 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-pink-400`}></div>
            {/* Dog ears */}
            <div className="absolute -top-1 left-1 w-3 h-4 bg-brown-600 transform -rotate-12 pixel-perfect"></div>
            <div className="absolute -top-1 right-1 w-3 h-4 bg-brown-600 transform rotate-12 pixel-perfect"></div>
          </>
        );
      case 2: // Bunny
        return (
          <>
            <div className={`${eyeClass} top-3 left-3`}></div>
            <div className={`${eyeClass} top-3 right-3`}></div>
            <div className={`${noseClass} top-5 left-1/2 transform -translate-x-1/2`}></div>
            <div className={`${mouthClass} top-6 left-1/2 transform -translate-x-1/2 w-1 h-1`}></div>
            {/* Bunny ears */}
            <div className="absolute -top-4 left-3 w-2 h-6 bg-gray-400 pixel-perfect"></div>
            <div className="absolute -top-4 right-3 w-2 h-6 bg-gray-400 pixel-perfect"></div>
          </>
        );
      case 3: // Fox
        return (
          <>
            <div className={`${eyeClass} top-3 left-3`}></div>
            <div className={`${eyeClass} top-3 right-3`}></div>
            <div className={`${noseClass} top-5 left-1/2 transform -translate-x-1/2`}></div>
            <div className={`${mouthClass} top-6 left-1/2 transform -translate-x-1/2 w-2 h-0.5`}></div>
            {/* Fox ears */}
            <div className="absolute -top-2 left-2 w-0 h-0 border-l-3 border-r-3 border-b-4 border-transparent border-b-red-500 pixel-perfect"></div>
            <div className="absolute -top-2 right-2 w-0 h-0 border-l-3 border-r-3 border-b-4 border-transparent border-b-red-500 pixel-perfect"></div>
          </>
        );
      case 4: // Panda
        return (
          <>
            {/* Panda eye patches */}
            <div className="absolute top-2 left-2 w-3 h-3 bg-black pixel-perfect"></div>
            <div className="absolute top-2 right-2 w-3 h-3 bg-black pixel-perfect"></div>
            <div className="absolute top-3 left-3 w-1 h-1 bg-white pixel-perfect"></div>
            <div className="absolute top-3 right-3 w-1 h-1 bg-white pixel-perfect"></div>
            <div className={`${noseClass} top-5 left-1/2 transform -translate-x-1/2`}></div>
            <div className={`${mouthClass} top-6 left-1/2 transform -translate-x-1/2 w-2 h-0.5`}></div>
            {/* Panda ears */}
            <div className="absolute -top-1 left-1 w-3 h-3 bg-black pixel-perfect"></div>
            <div className="absolute -top-1 right-1 w-3 h-3 bg-black pixel-perfect"></div>
          </>
        );
      case 5: // Frog
        return (
          <>
            {/* Frog eyes on top */}
            <div className="absolute -top-1 left-2 w-3 h-3 bg-yellow-400 pixel-perfect"></div>
            <div className="absolute -top-1 right-2 w-3 h-3 bg-yellow-400 pixel-perfect"></div>
            <div className="absolute -top-1 left-3 w-1 h-1 bg-black pixel-perfect"></div>
            <div className="absolute -top-1 right-3 w-1 h-1 bg-black pixel-perfect"></div>
            <div className={`${mouthClass} top-6 left-1/2 transform -translate-x-1/2 w-4 h-1`}></div>
          </>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="relative group cursor-pointer">
      {/* Pet Shadow */}
      <div className="w-18 h-4 bg-black opacity-20 absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3 pixel-perfect"></div>
      
      {/* Pet Body */}
      <div className={`w-16 h-16 bg-gradient-to-b ${pet.colors} border-4 border-black relative transition-all duration-200 group-hover:scale-110 pixel-perfect`}>
        {/* Pet Face */}
        {renderPetFace()}
        
        {/* Pixel Shine Effect */}
        <div className="absolute top-2 left-2 w-3 h-3 bg-white opacity-60 pixel-perfect"></div>
        
        {/* Sparkle Animation */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 pixel-perfect animate-pulse"></div>
        <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-pink-400 pixel-perfect animate-pulse" style={{ animationDelay: '0.8s' }}></div>
      </div>
      
      {/* Pet Name Tag */}
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 text-xs pixel-perfect opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap" style={{ fontFamily: 'monospace' }}>
        {pet.name}
      </div>
    </div>
  );
};
