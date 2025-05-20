// src/components/CustomCursor.tsx
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';

const CustomCursor: React.FC = () => {
  const { currentCursor } = useContext(UserContext);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{x: number, y: number}>>([]);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setTrail(prev => [...prev.slice(-5), {x: e.clientX, y: e.clientY}]);
    };
    
    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <>
      <img 
        src={`/assets/images/cursors/${currentCursor}.png`} 
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          width: '32px',
          height: '32px'
        }}
        alt="Cursor"
      />
      {trail.map((pos, i) => (
        <img
          key={i}
          src={`/assets/images/cursors/${currentCursor}.png`}
          style={{
            position: 'fixed',
            left: pos.x,
            top: pos.y,
            pointerEvents: 'none',
            zIndex: 9998,
            transform: 'translate(-50%, -50%)',
            width: `${24 - i*2}px`,
            height: `${24 - i*2}px`,
            opacity: 1 - i*0.2
          }}
          alt="Cursor trail"
        />
      ))}
    </>
  );
};

export default CustomCursor;