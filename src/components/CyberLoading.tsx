import { useState, useEffect, useRef } from 'react';

interface Pixel {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  opacity: number;
  delay: number;
  speed: number;
}

const CyberLoading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState<'scatter' | 'form' | 'complete'>('scatter');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create scattered pixels
    const createScatteredPixels = () => {
      const pixels: Pixel[] = [];
      const numPixels = Math.min(800, Math.floor((canvas.width * canvas.height) / 2000));
      
      for (let i = 0; i < numPixels; i++) {
        pixels.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          targetX: 0,
          targetY: 0,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          delay: Math.random() * 1000,
          speed: Math.random() * 0.02 + 0.01,
        });
      }
      
      pixelsRef.current = pixels;
    };

    // Calculate target positions to form "RAKSHNA"
    const calculateTargetPositions = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // RAKSHNA text dimensions and positions
      const textWidth = Math.min(canvas.width * 0.8, 600);
      const textHeight = textWidth * 0.15;
      const startX = centerX - textWidth / 2;
      const startY = centerY - textHeight / 2;

      // Create a virtual canvas to draw the text and get pixel positions
      const virtualCanvas = document.createElement('canvas');
      virtualCanvas.width = textWidth;
      virtualCanvas.height = textHeight;
      const virtualCtx = virtualCanvas.getContext('2d');
      
      if (!virtualCtx) return;

      virtualCtx.fillStyle = '#00ff00';
      virtualCtx.font = `bold ${textHeight * 0.8}px 'Courier New', monospace`;
      virtualCtx.textAlign = 'center';
      virtualCtx.textBaseline = 'middle';
      virtualCtx.fillText('RAKSHNA', textWidth / 2, textHeight / 2);

      const imageData = virtualCtx.getImageData(0, 0, textWidth, textHeight);
      const targetPositions: { x: number; y: number }[] = [];

      // Sample pixels from the text
      for (let y = 0; y < textHeight; y += 2) {
        for (let x = 0; x < textWidth; x += 2) {
          const pixelIndex = (y * textWidth + x) * 4;
          if (imageData.data[pixelIndex] > 0) { // Green pixel
            targetPositions.push({
              x: startX + x,
              y: startY + y,
            });
          }
        }
      }

      // Assign target positions to pixels
      pixelsRef.current.forEach((pixel, index) => {
        if (targetPositions[index % targetPositions.length]) {
          const target = targetPositions[index % targetPositions.length];
          pixel.targetX = target.x;
          pixel.targetY = target.y;
        }
      });
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.fillStyle = '#000814';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle background grid
      ctx.strokeStyle = '#001d3d';
      ctx.lineWidth = 0.5;
      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw pixels
      pixelsRef.current.forEach((pixel) => {
        if (phase === 'scatter') {
          // Random twinkling effect
          pixel.opacity = 0.3 + Math.sin(Date.now() * 0.003 + pixel.x * 0.01) * 0.4;
        } else if (phase === 'form') {
          // Move towards target
          const dx = pixel.targetX - pixel.x;
          const dy = pixel.targetY - pixel.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 1) {
            pixel.x += dx * pixel.speed;
            pixel.y += dy * pixel.speed;
          }
          pixel.opacity = Math.min(1, pixel.opacity + 0.02);
        }

        // Draw pixel
        ctx.fillStyle = `rgba(0, 255, 0, ${pixel.opacity})`;
        ctx.shadowColor = '#00ff00';
        ctx.shadowBlur = 4;
        ctx.fillRect(pixel.x - pixel.size/2, pixel.y - pixel.size/2, pixel.size, pixel.size);
      });

      ctx.shadowBlur = 0;

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    createScatteredPixels();
    animate();

    // Phase transitions
    const timer1 = setTimeout(() => {
      setPhase('form');
      calculateTargetPositions();
    }, 1500);

    const timer2 = setTimeout(() => {
      setPhase('complete');
    }, 4500);

    const timer3 = setTimeout(() => {
      setIsLoading(false);
    }, 5500);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-slate-900 via-blue-900 to-black overflow-hidden">
      {/* Background matrix rain effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="matrix-rain"></div>
      </div>
      
      {/* Main canvas for pixel animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: 'pixelated' }}
      />
      
      {/* Loading text overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center space-y-4">
          <div className="text-green-400 text-sm font-mono tracking-wider opacity-70">
            {phase === 'scatter' && 'INITIALIZING SECURITY PROTOCOLS...'}
            {phase === 'form' && 'CONNECTING TO RAKSHNA NETWORK...'}
            {phase === 'complete' && 'ACCESS GRANTED'}
          </div>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>

      {/* Matrix-style background animation */}
      <style jsx>{`
        .matrix-rain {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle at 20% 80%, rgba(0, 255, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0, 255, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(0, 255, 0, 0.05) 0%, transparent 50%);
          animation: matrixPulse 3s ease-in-out infinite;
        }

        @keyframes matrixPulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }

        .loading-bar {
          width: 200px;
          height: 2px;
          background: rgba(0, 255, 0, 0.2);
          border-radius: 1px;
          overflow: hidden;
          position: relative;
        }

        .loading-progress {
          height: 100%;
          background: linear-gradient(90deg, transparent, #00ff00, transparent);
          border-radius: 1px;
          animation: loadingProgress 5s ease-out forwards;
        }

        @keyframes loadingProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .loading-bar {
            width: 150px;
          }
        }
      `}</style>
    </div>
  );
};

export default CyberLoading;
