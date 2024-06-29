import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedButton = () => {
  const buttonRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    gsap.to(backgroundRef.current, {
      x: '100%',
      duration: 2,
      ease: 'linear',
      repeat: -1,
    });
  }, []);

  return (
    <div className="relative inline-block">
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-blue-200 h-full w-full transform -skew-x-12"
        style={{ 
          zIndex: -1, 
          backgroundImage: 'linear-gradient(135deg, rgba(0,0,255,0.1) 25%, transparent 25%, transparent 50%, rgba(0,0,255,0.1) 50%, rgba(0,0,255,0.1) 75%, transparent 75%, transparent)',
          backgroundSize: '20px 20px'
        }}
      ></div>
      <button 
        ref={buttonRef}
        className="relative z-10 py-2 px-6 border-2 border-redaccent text-redaccent font-semibold rounded hover:bg-redaccent hover:text-white transition-colors duration-300"
      >
        Get in Touch
      </button>
    </div>
  );
};

export default AnimatedButton;
