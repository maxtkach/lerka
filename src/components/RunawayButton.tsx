import React, { useState } from 'react';

interface RunawayButtonProps {
  children: React.ReactNode;
  className?: string;
}

export const RunawayButton: React.FC<RunawayButtonProps> = ({ children, className }) => {
  const [hasMoved, setHasMoved] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const moveButton = () => {
    // Ограничиваем координаты по горизонтали (25% - 75%) и вертикали (15% - 80%),
    // чтобы кнопка со 100% вероятностью помещалась на экране мобильного телефона шириной 430px
    // и не обрезалась границами контейнера.
    let randomX = Math.floor(Math.random() * 50) + 25; // 25% - 75%
    let randomY = Math.floor(Math.random() * 65) + 15; // 15% - 80%

    // Избегаем прыжка в то же самое место
    if (hasMoved) {
      while (Math.abs(randomX - position.x) < 15 && Math.abs(randomY - position.y) < 15) {
        randomX = Math.floor(Math.random() * 50) + 25;
        randomY = Math.floor(Math.random() * 65) + 15;
      }
    }

    setPosition({ x: randomX, y: randomY });
    setHasMoved(true);
  };

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    moveButton();
  };

  const buttonStyle: React.CSSProperties = hasMoved
    ? {
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 50,
      }
    : {};

  return (
    <>
      {/* 
        Если кнопка уже «убежала», оставляем на её месте невидимую копию (плейсхолдер),
        чтобы основной макет не прыгал и кнопка «Да» оставалась на месте.
      */}
      {hasMoved && (
        <div className="w-full py-4 opacity-0 pointer-events-none select-none">
          {children}
        </div>
      )}

      <button
        style={buttonStyle}
        className={`${className} ${
          hasMoved ? 'transition-all duration-200 ease-out' : ''
        } select-none cursor-pointer`}
        onMouseEnter={handleInteraction}
        onTouchStart={handleInteraction}
        onClick={handleInteraction}
        onMouseDown={handleInteraction}
      >
        {children}
      </button>
    </>
  );
};
