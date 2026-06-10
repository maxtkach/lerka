import React, { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  type: 'heart' | 'star' | 'sparkle';
}

export const BackgroundElements: React.FC = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const initialElements = Array.from({ length: 12 }).map((_, idx) => {
      const types: ('heart' | 'star' | 'sparkle')[] = ['heart', 'star', 'sparkle'];
      return {
        id: idx,
        x: Math.random() * 90 + 5,
        y: Math.random() * 85 + 5,
        size: Math.random() * 20 + 12,
        delay: Math.random() * 6,
        duration: Math.random() * 8 + 8,
        opacity: Math.random() * 0.35 + 0.15,
        type: types[Math.floor(Math.random() * types.length)],
      };
    });
    setElements(initialElements);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none select-none">
      {/* Романтичное закатное солнце */}
      <div className="absolute top-[12%] right-[10%] w-32 h-32 md:w-40 md:h-40">
        {/* Внешнее свечение */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-romantic-gold/40 to-sunset-coral/30 blur-2xl animate-pulse-glow" />
        {/* Само солнце */}
        <div className="absolute inset-0 rounded-full bg-gradient-radial from-romantic-gold via-sunset-coral to-romantic-rose opacity-90 animate-pulse-soft" 
             style={{ 
               background: 'radial-gradient(circle, #FFD700 0%, #FFCAB0 40%, #FF8FA3 100%)'
             }} 
        />
        {/* Блики */}
        <div className="absolute top-[15%] left-[15%] w-[30%] h-[30%] rounded-full bg-white/40 blur-md" />
      </div>

      {/* Романтичные чайки */}
      <svg className="absolute top-[18%] left-[12%] w-12 h-7 text-romantic-rose/50 animate-seagull-fly" 
           viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
        <path d="M10,40 Q30,10 50,40 Q70,10 90,40" />
      </svg>
      <svg className="absolute top-[25%] right-[20%] w-9 h-5 text-romantic-pink/40 animate-float-medium" 
           viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round"
           style={{ animationDelay: '2s' }}>
        <path d="M10,40 Q30,10 50,40 Q70,10 90,40" />
      </svg>
      <svg className="absolute top-[10%] left-[45%] w-10 h-6 text-sunset-coral/35 animate-float-slow" 
           viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"
           style={{ animationDelay: '4s' }}>
        <path d="M10,40 Q30,10 50,40 Q70,10 90,40" />
      </svg>

      {/* Романтичные парящие элементы */}
      {elements.map((elem) => {
        if (elem.type === 'heart') {
          return (
            <svg
              key={elem.id}
              className="absolute animate-float-slow"
              style={{
                left: `${elem.x}%`,
                top: `${elem.y}%`,
                width: `${elem.size}px`,
                height: `${elem.size}px`,
                animationDelay: `${elem.delay}s`,
                animationDuration: `${elem.duration}s`,
                opacity: elem.opacity,
                color: 'rgb(255, 182, 193)',
              }}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          );
        } else if (elem.type === 'star') {
          return (
            <svg
              key={elem.id}
              className="absolute animate-float-medium"
              style={{
                left: `${elem.x}%`,
                top: `${elem.y}%`,
                width: `${elem.size}px`,
                height: `${elem.size}px`,
                animationDelay: `${elem.delay}s`,
                animationDuration: `${elem.duration}s`,
                opacity: elem.opacity,
                color: 'rgb(255, 215, 0)',
              }}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          );
        } else {
          return (
            <div
              key={elem.id}
              className="absolute rounded-full animate-bounce-gentle"
              style={{
                left: `${elem.x}%`,
                top: `${elem.y}%`,
                width: `${elem.size * 0.4}px`,
                height: `${elem.size * 0.4}px`,
                animationDelay: `${elem.delay}s`,
                animationDuration: `${elem.duration}s`,
                opacity: elem.opacity,
                background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,192,203,0.6) 100%)',
                boxShadow: '0 0 10px rgba(255,255,255,0.5)',
              }}
            />
          );
        }
      })}

      {/* Романтичные волны */}
      <div className="absolute bottom-0 left-0 right-0 h-52 overflow-hidden">
        {/* Задняя волна - нежно-лиловая */}
        <svg 
          className="absolute bottom-0 w-[200%] h-40 wave-anim-1 opacity-60" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          style={{ fill: '#E5C1E8' }}
        >
          <path d="M0,70 C150,100 350,40 500,70 C650,100 850,40 1000,70 C1150,100 1350,40 1500,70 L1500,120 L0,120 Z" />
        </svg>

        {/* Средняя волна - романтичный розовый */}
        <svg 
          className="absolute bottom-0 w-[200%] h-36 wave-anim-2 opacity-70" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          style={{ fill: '#FFC2D1' }}
        >
          <path d="M0,60 C100,85 250,35 400,60 C550,85 700,35 850,60 C1000,85 1150,35 1300,60 L1300,120 L0,120 Z" />
        </svg>

        {/* Передняя волна - нежный персик */}
        <svg 
          className="absolute bottom-0 w-[200%] h-32 wave-anim-3 opacity-85" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          style={{ fill: '#FFE5D9' }}
        >
          <path d="M0,50 C200,90 400,10 600,50 C800,90 1000,10 1200,50 L1200,120 L0,120 Z" />
        </svg>

        {/* Самая передняя волна - кремовый белый */}
        <svg 
          className="absolute bottom-0 w-[200%] h-24 wave-anim-1 opacity-95" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          style={{ fill: '#FFF9F0', animationDuration: '18s' }}
        >
          <path d="M0,35 C150,65 350,5 500,35 C650,65 850,5 1000,35 C1150,65 1350,5 1500,35 L1500,120 L0,120 Z" />
        </svg>
      </div>

      {/* Мягкие облака */}
      <div className="absolute top-[30%] left-[5%] w-24 h-12 rounded-full bg-white/20 blur-xl animate-float-slow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-[35%] right-[8%] w-32 h-14 rounded-full bg-white/15 blur-xl animate-float-medium" style={{ animationDelay: '3s' }} />
      <div className="absolute top-[42%] left-[30%] w-20 h-10 rounded-full bg-white/25 blur-xl animate-float-fast" style={{ animationDelay: '2s' }} />
    </div>
  );
};
