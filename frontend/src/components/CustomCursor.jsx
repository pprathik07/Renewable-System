import React, { useEffect, useState, useRef } from 'react';
import { Box } from '@mui/material';
import { keyframes } from '@emotion/react';

// Define animations for cursor elements
const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const CustomCursor = ({ 
  color = '#ff00ff', // Changed default to magenta/pink
  trailColor = 'rgba(255, 0, 255, 0.2)', // Updated trail color to match
  clickColor = '#00ffff', // Changed click color to cyan for contrast
  size = 30,
  trailLength = 5,
  enableTrail = true,
  enableClick = true,
  cursorType = 'triangle' // Default to triangle shape
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [trailPositions, setTrailPositions] = useState([]);
  const trailTimeoutRef = useRef(null);
  const lastUpdateTimeRef = useRef(0);
  const UPDATE_INTERVAL = 50; // ms between trail position updates
  
  // Update cursor position on mouse move
  useEffect(() => {
    const updatePosition = (e) => {
      const currentTime = Date.now();
      
      // Always update the main cursor position
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Only add trail positions at intervals to avoid too many elements
      if (enableTrail && currentTime - lastUpdateTimeRef.current > UPDATE_INTERVAL) {
        setTrailPositions(prevPositions => {
          const newPositions = [...prevPositions, { x: e.clientX, y: e.clientY }];
          // Keep only the latest positions based on trailLength
          return newPositions.slice(-trailLength);
        });
        lastUpdateTimeRef.current = currentTime;
      }
    };
    
    window.addEventListener('mousemove', updatePosition);
    
    // Clean up
    return () => {
      window.removeEventListener('mousemove', updatePosition);
    };
  }, [enableTrail, trailLength]);
  
  // Handle mouse click effects
  useEffect(() => {
    if (!enableClick) return;
    
    const handleMouseDown = () => {
      setIsClicking(true);
    };
    
    const handleMouseUp = () => {
      setIsClicking(false);
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [enableClick]);
  
  // Hide system cursor
  useEffect(() => {
    // Add style to hide the default cursor
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        cursor: none !important;
      }
      a, button, [role="button"], [type="button"], [type="submit"], [type="reset"] {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Render different cursor types
  const renderCursor = () => {
    const cursorSize = isClicking ? size * 0.8 : size;
    const currentColor = isClicking ? clickColor : color;
    const glowIntensity = isClicking ? '20px' : '10px';
    
    switch (cursorType) {
      case 'dot':
        return (
          <Box
            sx={{
              width: cursorSize,
              height: cursorSize,
              borderRadius: '50%',
              backgroundColor: currentColor,
              filter: `drop-shadow(0 0 ${glowIntensity} ${currentColor})`,
              transform: 'translate(-50%, -50%)',
              transition: 'width 0.2s, height 0.2s',
              animation: isClicking ? `${pulse} 0.5s ease-in-out` : 'none',
              mixBlendMode: 'screen',
            }}
          />
        );
      
      case 'ring':
        return (
          <Box
            sx={{
              width: cursorSize,
              height: cursorSize,
              borderRadius: '50%',
              border: `2px solid ${currentColor}`,
              filter: `drop-shadow(0 0 ${glowIntensity} ${currentColor})`,
              transform: 'translate(-50%, -50%)',
              transition: 'width 0.2s, height 0.2s',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '4px',
                height: '4px',
                backgroundColor: currentColor,
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                filter: `drop-shadow(0 0 5px ${currentColor})`,
              },
              ...(isClicking ? {
                animation: `${rotate} 1s linear infinite`,
              } : {}),
            }}
          />
        );
        
      case 'triangle':
      default:
        return (
          <Box
            sx={{
              width: 0,
              height: 0,
              borderLeft: `${cursorSize/2}px solid transparent`,
              borderRight: `${cursorSize/2}px solid transparent`,
              borderBottom: `${cursorSize}px solid ${currentColor}`,
              // Changed rotation to point to the right like a "play" triangle
              transform: 'translate(-50%, -50%) rotate(-30deg)',
              filter: `drop-shadow(0 0 ${glowIntensity} ${currentColor})`,
              transition: 'all 0.2s ease',
              ...(isClicking ? {
                transform: 'translate(-50%, -50%) rotate(90deg) scale(0.8)',
              } : {}),
            }}
          />
        );
    }
  };

  return (
    <>
      {/* Trail elements */}
      {enableTrail && trailPositions.map((pos, index) => {
        const opacity = 0.7 * (index / trailPositions.length);
        const scale = 0.3 + (0.7 * index / trailPositions.length);
        
        return (
          <Box
            key={index}
            sx={{
              position: 'fixed',
              top: pos.y,
              left: pos.x,
              width: size * scale,
              height: size * scale,
              borderRadius: '0%',
              backgroundColor: trailColor,
              opacity,
              pointerEvents: 'none',
              zIndex: 9998,
              transform: 'translate(-50%, -50%)',
              transition: 'opacity 0.5s ease',
            }}
          />
        );
      })}
      
      {/* Main cursor */}
      <Box
        sx={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.1s ease',
        }}
      >
        {renderCursor()}
      </Box>
    </>
  );
};

export default CustomCursor;