import confetti from 'canvas-confetti';

// Функция запуска праздничного конфетти
export const triggerSuccessConfetti = () => {
  const duration = 4 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 25, spread: 360, ticks: 80, zIndex: 999 };

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / duration);
    
    // Запуск слева и справа
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    });
  }, 250);
};

// Функция запуска быстрого романтичного взрыва (например, при согласии)
export const triggerLoveConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#FCE4EC', '#F48FB1', '#F06292', '#FF8A80', '#FFF59D'],
    zIndex: 999,
  });
};
