import { useState } from 'react';
import { Heart, Calendar, Clock, ShoppingBag, Check, Send, ArrowLeft } from 'lucide-react';
import { BackgroundElements } from './components/BackgroundElements';
import { RunawayButton } from './components/RunawayButton';
import { triggerLoveConfetti, triggerSuccessConfetti } from './components/Confetti';

type ScreenType =
  | 'INTRO'           // Экран 1
  | 'CHOOSE_DATE'     // Экран 2
  | 'CHOOSE_TIME'     // Экран 3
  | 'CHOOSE_FOOD'     // Экран 4
  | 'FINAL_SUMMARY'   // Экран 5
  | 'REJECTION'       // Экран Отказа
  | 'SUCCESS';        // Экран Успеха (после отправки)

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('INTRO');
  const [selectedDate, setSelectedDate] = useState<string>(''); // 13 июня или 14 июня
  const [isStubborn, setIsStubborn] = useState<boolean>(false); // Нажала ли "Не могу на выходных"
  const [showStubbornToast, setShowStubbornToast] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string>(''); // 12:00, 13:00, и т.д.
  const [selectedFood, setSelectedFood] = useState<string[]>([]); // чипсы, пицца, и т.д.
  const [customFood, setCustomFood] = useState<string>(''); // свой вариант еды
  const [isSending, setIsSending] = useState<boolean>(false);

  // Возврат на предыдущий экран
  const handleBack = () => {
    switch (currentScreen) {
      case 'CHOOSE_DATE':
        setCurrentScreen('INTRO');
        break;
      case 'CHOOSE_TIME':
        setCurrentScreen('CHOOSE_DATE');
        break;
      case 'CHOOSE_FOOD':
        setCurrentScreen('CHOOSE_TIME');
        break;
      case 'FINAL_SUMMARY':
        setCurrentScreen('CHOOSE_FOOD');
        break;
      default:
        break;
    }
  };

  // Выбор еды
  const handleToggleFood = (food: string) => {
    if (selectedFood.includes(food)) {
      setSelectedFood(prev => prev.filter(item => item !== food));
    } else {
      setSelectedFood(prev => [...prev, food]);
    }
  };

  // Отправка ответа в Телеграм
  const handleSendAnswer = async () => {
    setIsSending(true);

    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '';
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || '';

    const foodList = selectedFood.length > 0
      ? selectedFood.map(item => `• ${item}`).join('\n')
      : '• Ничего не выбрано';
    const customFoodStr = customFood.trim() ? customFood.trim() : 'Нет';

    const messageText = `🌊 *Новая заявка на море от Лерки!* 🌅\n\n` +
      `📅 *Дата:* ${selectedDate}\n` +
      `🕒 *Время:* ${selectedTime}\n\n` +
      `🍕 *Берем с собой:*\n${foodList}\n\n` +
      `✍️ *Свой вариант:* ${customFoodStr}`;

    // Если переменные окружения отсутствуют, мы симулируем успех (для демо),
    // но выводим предупреждение в консоль.
    if (!botToken || !chatId) {
      console.warn(
        'Внимание: Переменные окружения Telegram (VITE_TELEGRAM_BOT_TOKEN или VITE_TELEGRAM_CHAT_ID) не заданы.\n' +
        'Сообщение в бот не отправлено, но мы показываем экран успеха для демонстрации.'
      );
      setTimeout(() => {
        setIsSending(false);
        triggerSuccessConfetti();
        setCurrentScreen('SUCCESS');
      }, 1500);
      return;
    }

    try {
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: 'Markdown',
        }),
      });

      if (response.ok) {
        setIsSending(false);
        triggerSuccessConfetti();
        setCurrentScreen('SUCCESS');
      } else {
        throw new Error(`Ошибка отправки: ${response.statusText}`);
      }
    } catch (err) {
      console.error('Ошибка при отправке в Telegram:', err);
      setIsSending(false);
      triggerSuccessConfetti();
      setCurrentScreen('SUCCESS');
    }
  };

  // Отправка сообщения об отказе в Телеграм
  const handleSendRejection = async () => {
    setCurrentScreen('REJECTION');

    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '';
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || '';

    const messageText = `❌ *Лерка отказалась от моря...* 💔\n\n` +
      `Причина: "Точно не могу, Бэкки рожает" 🐶🍼`;

    if (!botToken || !chatId) {
      console.warn(
        'Внимание: Переменные окружения Telegram не заданы.\n' +
        'Сообщение об отказе в бот не отправлено.'
      );
      return;
    }

    try {
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: 'Markdown',
        }),
      });
    } catch (err) {
      console.error('Ошибка при отправке отказа в Telegram:', err);
    }
  };

  return (
    <div className="w-full h-full min-h-[100svh] flex justify-center items-center relative select-none overflow-hidden">
      {/* Декоративный романтичный фон */}
      <BackgroundElements />

      {/* Мобильный контейнер с эффектом матового стекла */}
      <div className="w-full max-w-[430px] h-[100svh] md:h-[850px] md:min-h-0 md:rounded-[45px] bg-white/25 backdrop-blur-xl flex flex-col justify-between items-center px-6 py-10 text-center relative overflow-hidden z-10 safe-pb safe-pt
        md:shadow-[0_30px_80px_rgba(255,182,193,0.35),_0_0_0_1px_rgba(255,255,255,0.5)] 
        md:border-[10px] md:border-white/50
        transition-all duration-700">
        
        {/* Внутреннее свечение контейнера */}
        <div className="absolute inset-0 bg-gradient-to-b from-romantic-pink/10 via-transparent to-sunset-coral/10 pointer-events-none" />
        
        {/* Кнопка "Назад" */}
        <div className="w-full flex justify-start items-center min-h-[44px] relative z-20">
          {['CHOOSE_DATE', 'CHOOSE_TIME', 'CHOOSE_FOOD', 'FINAL_SUMMARY'].includes(currentScreen) && (
            <button
              onClick={handleBack}
              className="p-3.5 rounded-full bg-white/90 text-romantic-rose hover:bg-romantic-pink/30 hover:text-romantic-rose active:scale-90 transition-all duration-300 shadow-[0_4px_20px_rgba(255,143,163,0.25)] border border-white/80 cursor-pointer backdrop-blur-sm"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5px]" />
            </button>
          )}
        </div>

        {/* --- ЭКРАН 1: ВВЕДЕНИЕ --- */}
        {currentScreen === 'INTRO' && (
          <div className="flex-1 w-full flex flex-col justify-center items-center gap-10 animate-slide-up relative z-10">
            {/* Романтическое пульсирующее сердечко с сиянием */}
            <div className="relative w-28 h-28">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-romantic-pink via-romantic-rose to-sunset-coral opacity-40 blur-2xl animate-pulse-glow" />
              <div className="relative w-28 h-28 bg-gradient-to-br from-white/80 to-romantic-pink/60 rounded-full flex justify-center items-center shadow-[0_10px_40px_rgba(255,143,163,0.4)] border-4 border-white/70 animate-heart-beat backdrop-blur-sm">
                <Heart className="w-14 h-14 text-romantic-rose fill-romantic-rose drop-shadow-lg" />
              </div>
            </div>

            <div className="space-y-5 px-2">
              <h1 className="text-3xl font-bold leading-snug font-sans tracking-wide drop-shadow-sm">
                <span className="bg-gradient-to-r from-romantic-rose via-romantic-pink to-sunset-coral bg-clip-text text-transparent">
                  ЛЕРКААА!
                </span>{' '}
                <span>👋</span>
              </h1>
              <p className="text-lg font-semibold text-slate-700/90 leading-relaxed max-w-[280px] mx-auto drop-shadow-sm">
                У меня есть одно очень важное предложение...
              </p>
              <div className="bg-gradient-to-br from-white/80 to-romantic-pink/20 backdrop-blur-md p-6 rounded-[28px] border-2 border-white/90 shadow-[0_15px_40px_rgba(255,143,163,0.2)] mt-4">
                <h2 className="text-2xl font-bold leading-relaxed drop-shadow-sm">
                  <span className="bg-gradient-to-r from-romantic-rose to-sunset-coral bg-clip-text text-transparent">
                    Поехали на море вместе?
                  </span>{' '}
                  <span>🌊🌅</span>
                </h2>
              </div>
            </div>

            {/* Блок с кнопками */}
            <div className="w-full flex flex-col gap-5 mt-6 min-h-[140px]">
              <button
                onClick={() => {
                  triggerLoveConfetti();
                  setCurrentScreen('CHOOSE_DATE');
                }}
                className="w-full py-5 bg-gradient-to-r from-romantic-rose via-romantic-pink to-sunset-coral text-white rounded-full font-bold text-xl shadow-[0_15px_35px_rgba(255,143,163,0.4)] hover:shadow-[0_20px_45px_rgba(255,143,163,0.5)] hover:scale-[1.03] active:scale-97 transition-all duration-500 border-2 border-white/40 cursor-pointer backdrop-blur-sm"
              >
                Да! 🥰
              </button>

              <RunawayButton
                className="w-full py-5 bg-white/95 text-romantic-rose rounded-full font-bold text-xl shadow-[0_8px_25px_rgba(255,182,193,0.25)] border-2 border-romantic-pink/30 hover:bg-romantic-pink/20 hover:scale-[1.03] active:scale-97 transition-all duration-500 backdrop-blur-sm"
              >
                Нет 🥺
              </RunawayButton>
            </div>
          </div>
        )}

        {/* --- ЭКРАН 2: ВЫБОР ДНЯ --- */}
        {currentScreen === 'CHOOSE_DATE' && (
          <div className="flex-1 w-full flex flex-col justify-center items-center gap-6 animate-slide-up relative z-10">
            {showStubbornToast && (
              <div className="absolute top-[10%] left-1/2 -translate-x-1/2 px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-700 text-white font-bold rounded-[16px] text-sm shadow-[0_10px_20px_rgba(0,0,0,0.2)] border-2 border-white/20 animate-bounce z-50 backdrop-blur-md">
                Да не ломайся ты! 😉
              </div>
            )}

            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-romantic-gold to-sunset-coral opacity-30 blur-lg animate-pulse-glow" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-white/90 to-sunset-coral/40 rounded-full flex justify-center items-center shadow-[0_4px_15px_rgba(255,202,176,0.2)] animate-float-slow border-2 border-white/80 backdrop-blur-sm">
                <Calendar className="w-6 h-6 text-sunset-coral drop-shadow-sm" />
              </div>
            </div>

            <h2 className="text-xl font-bold font-sans px-4 drop-shadow-sm">
              <span className="bg-gradient-to-r from-romantic-rose to-sunset-coral bg-clip-text text-transparent">
                Выбирай день
              </span>{' '}
              <span>📅</span>
            </h2>

            {/* Карточки дат */}
            <div className="w-full flex flex-col gap-4 mt-2 px-1">
              <button
                onClick={() => {
                  setSelectedDate('13 июня');
                  setCurrentScreen('CHOOSE_TIME');
                }}
                style={{ transform: isStubborn ? 'scale(1.05)' : 'scale(1)' }}
                className={`w-full py-4 px-5 bg-gradient-to-br from-white/90 to-romantic-pink/20 border-3 rounded-[20px] flex items-center justify-between shadow-[0_6px_20px_rgba(255,182,193,0.15)] transition-all duration-500 cursor-pointer backdrop-blur-md ${
                  selectedDate === '13 июня'
                    ? 'border-romantic-rose shadow-[0_10px_25px_rgba(255,143,163,0.3)] scale-[1.02]'
                    : 'border-white/70 hover:border-romantic-pink/50'
                }`}
              >
                <div className="text-left">
                  <p className="text-lg font-bold text-slate-800">13 июня</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">Пятница • Выходной 🌊</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-pink-50/80 flex items-center justify-center border border-pink-100/50">
                  <span className="text-pink-500 text-base">🔥</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setSelectedDate('14 июня');
                  setCurrentScreen('CHOOSE_TIME');
                }}
                style={{ transform: isStubborn ? 'scale(1.05)' : 'scale(1)' }}
                className={`w-full py-4 px-5 bg-gradient-to-br from-white/90 to-romantic-pink/20 border-3 rounded-[20px] flex items-center justify-between shadow-[0_6px_20px_rgba(255,182,193,0.15)] transition-all duration-500 cursor-pointer backdrop-blur-md ${
                  selectedDate === '14 июня'
                    ? 'border-romantic-rose shadow-[0_10px_25px_rgba(255,143,163,0.3)] scale-[1.02]'
                    : 'border-white/70 hover:border-romantic-pink/50'
                }`}
              >
                <div className="text-left">
                  <p className="text-lg font-bold text-slate-800 font-sans">14 июня</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">Суббота • Выходной 🌅</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-pink-50/80 flex items-center justify-center border border-pink-100/50">
                  <span className="text-pink-500 text-base">🥂</span>
                </div>
              </button>
            </div>

            {/* Нижний блок для упрямых */}
            <div className="w-full flex flex-col gap-3 mt-4">
              {!isStubborn ? (
                <button
                  onClick={() => {
                    setIsStubborn(true);
                    setShowStubbornToast(true);
                    setTimeout(() => setShowStubbornToast(false), 3000);
                  }}
                  className="w-full py-3 bg-white/60 text-slate-600 rounded-2xl font-bold text-xs shadow-sm border border-white/60 transition-all active:scale-95 hover:bg-white/85 cursor-pointer"
                >
                  Не могу на выходных 🥺
                </button>
              ) : (
                <button
                  onClick={handleSendRejection}
                  className="w-full py-5 bg-gradient-to-r from-rose-200 to-rose-300 text-rose-700 rounded-[22px] font-bold text-base shadow-[0_8px_20px_rgba(225,29,72,0.2)] border-2 border-rose-300/60 transition-all hover:shadow-[0_10px_25px_rgba(225,29,72,0.25)] active:scale-95 animate-pulse-soft cursor-pointer backdrop-blur-sm"
                >
                  Точно не могу, Бэкки рожает 🐶
                </button>
              )}
            </div>
          </div>
        )}

        {/* --- ЭКРАН ОТКАЗА --- */}
        {currentScreen === 'REJECTION' && (
          <div className="flex-1 w-full flex flex-col justify-center items-center gap-8 animate-slide-up relative z-10">
            <div className="relative w-28 h-28">
              <div className="absolute inset-0 rounded-full bg-slate-300/30 blur-xl" />
              <div className="relative w-28 h-28 bg-gradient-to-br from-slate-100/95 to-slate-200/80 rounded-full flex justify-center items-center shadow-[0_8px_30px_rgba(0,0,0,0.1)] border-4 border-white/70 backdrop-blur-sm">
                <span className="text-6xl">🥺</span>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-slate-700 font-sans drop-shadow-sm">
              На нет и суда нет
            </h2>
            <p className="text-base text-slate-500 max-w-[280px] leading-relaxed">
              Ох чорт блин нафиг что ж такое, чорт подери, очень жаль...
            </p>

            {/* Грустная волна */}
            <div className="w-full max-w-[180px] h-16 flex justify-center items-end gap-3 mt-6">
              <div className="w-4 h-8 bg-slate-400/40 rounded-full animate-bounce-gentle" style={{animationDelay: '0s'}} />
              <div className="w-4 h-12 bg-slate-400/50 rounded-full animate-bounce-gentle" style={{animationDelay: '0.2s'}} />
              <div className="w-4 h-10 bg-slate-400/40 rounded-full animate-bounce-gentle" style={{animationDelay: '0.4s'}} />
              <div className="w-4 h-7 bg-slate-400/30 rounded-full animate-bounce-gentle" style={{animationDelay: '0.6s'}} />
            </div>
          </div>
        )}

        {/* --- ЭКРАН 3: ВЫБОР ВРЕМЕНИ --- */}
        {currentScreen === 'CHOOSE_TIME' && (
          <div className="flex-1 w-full flex flex-col justify-center items-center gap-8 animate-slide-up relative z-10">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-romantic-pink to-romantic-rose opacity-30 blur-lg animate-pulse-glow" />
              <div className="relative w-14 h-14 bg-gradient-to-br from-white/90 to-romantic-pink/40 rounded-full flex justify-center items-center shadow-[0_6px_20px_rgba(255,182,193,0.25)] animate-float-medium border-3 border-white/80 backdrop-blur-sm">
                <Clock className="w-7 h-7 text-romantic-rose drop-shadow-sm" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-sans drop-shadow-sm">
                <span className="bg-gradient-to-r from-romantic-rose to-romantic-pink bg-clip-text text-transparent">
                  Во сколько поедем?
                </span>{' '}
                <span>🕒</span>
              </h2>
              <p className="text-xs text-slate-600 font-semibold bg-white/70 px-4 py-2 rounded-full border-2 border-white/80 inline-block shadow-sm backdrop-blur-sm">
                Выбранный день: <span className="text-romantic-rose">{selectedDate}</span>
              </p>
            </div>

            {/* Сетка времени */}
            <div className="w-full grid grid-cols-2 gap-3 mt-4 px-2 max-w-[320px]">
              {['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    setSelectedTime(time);
                    setCurrentScreen('CHOOSE_FOOD');
                  }}
                  className="py-3.5 bg-gradient-to-br from-white/95 to-romantic-pink/20 border-2 border-white/80 rounded-2xl font-bold text-lg text-slate-700 shadow-[0_4px_12px_rgba(255,182,193,0.12)] hover:border-romantic-pink/50 active:scale-95 transition-all duration-300 cursor-pointer backdrop-blur-sm"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* --- ЭКРАН 4: ВЫБОР ЕДЫ --- */}
        {currentScreen === 'CHOOSE_FOOD' && (
          <div className="flex-1 w-full flex flex-col justify-center items-center gap-4 animate-slide-up relative z-10">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-300 to-teal-400 opacity-30 blur-lg animate-pulse-glow" />
              <div className="relative w-14 h-14 bg-gradient-to-br from-white/90 to-emerald-200/40 rounded-full flex justify-center items-center shadow-[0_6px_20px_rgba(16,185,129,0.25)] animate-float-fast border-3 border-white/80 backdrop-blur-sm">
                <ShoppingBag className="w-7 h-7 text-emerald-600 drop-shadow-sm" />
              </div>
            </div>

            <div className="space-y-1 text-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent font-sans drop-shadow-sm">
                Что возьмем с собой?
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Отметь вкусности для идеального пикника 🍕🥤
              </p>
            </div>

            {/* Чекбоксы еды */}
            <div className="w-full flex flex-col gap-2 mt-3 text-left max-w-[320px] px-1">
              {[
                { id: 'chips', label: 'Чипсеки 🍟' },
                { id: 'pizza', label: 'Пицца 🍕' },
                { id: 'beer', label: 'Пиво(пожалуйста) 🍺' },
                { id: 'soda', label: 'Газировка 🥤' },
                { id: 'water', label: 'Обычная водичка 💧' }
              ].map((item) => {
                const isSelected = selectedFood.includes(item.label);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleToggleFood(item.label)}
                    className={`w-full py-2.5 px-4 rounded-xl border-2 flex items-center justify-between transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.04)] cursor-pointer backdrop-blur-sm ${
                      isSelected
                        ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50/70 font-bold shadow-[0_4px_12px_rgba(16,185,129,0.15)]'
                        : 'border-white/80 bg-white/85 hover:border-emerald-300/60 font-medium'
                    }`}
                  >
                    <span className="text-slate-700 text-sm">{item.label}</span>
                    <div
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                        isSelected ? 'bg-emerald-500 border-emerald-500 text-white scale-105' : 'border-slate-300 bg-white/90'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                    </div>
                  </button>
                );
              })}

              {/* Поле ввода для своего варианта */}
              <div className="w-full mt-1">
                <input
                  type="text"
                  placeholder="Либо напиши че ты хочешь ✨"
                  value={customFood}
                  onChange={(e) => setCustomFood(e.target.value)}
                  className="w-full py-2.5 px-4 rounded-xl border-2 border-white/80 bg-white/90 focus:border-romantic-pink/60 focus:outline-none placeholder-slate-400 font-medium text-slate-700 text-sm shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all backdrop-blur-sm"
                />
              </div>
            </div>

            <button
              onClick={() => setCurrentScreen('FINAL_SUMMARY')}
              className="w-full py-3.5 mt-3 bg-gradient-to-r from-romantic-rose via-romantic-pink to-sunset-coral text-white rounded-full font-bold text-lg shadow-[0_8px_20px_rgba(255,143,163,0.25)] hover:scale-[1.02] active:scale-95 border-2 border-white/40 transition-all duration-300 cursor-pointer max-w-[320px] backdrop-blur-sm"
            >
              ГАЗ ✨
            </button>
          </div>
        )}

        {/* --- ЭКРАН 5: ФИНАЛЬНАЯ СВОДКА --- */}
        {currentScreen === 'FINAL_SUMMARY' && (
          <div className="flex-1 w-full flex flex-col justify-center items-center gap-6 animate-slide-up overflow-y-auto max-h-[75vh] scrollbar-none py-2 relative z-10">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-romantic-pink to-romantic-rose opacity-40 blur-lg animate-pulse-glow" />
              <div className="relative w-14 h-14 bg-gradient-to-br from-white/90 to-romantic-pink/50 rounded-full flex justify-center items-center shadow-[0_6px_20px_rgba(255,143,163,0.25)] animate-heart-beat border-3 border-white/80 backdrop-blur-sm">
                <Heart className="w-7 h-7 text-romantic-rose fill-romantic-rose drop-shadow-sm" />
              </div>
            </div>

            <div className="w-full max-w-[320px] bg-gradient-to-br from-white/95 to-romantic-pink/20 backdrop-blur-xl rounded-[24px] p-5 border-2 border-white/70 shadow-[0_10px_30px_rgba(255,182,193,0.25)] text-left space-y-3">
              <h2 className="text-xl font-bold text-center font-sans border-b-2 border-romantic-pink/20 pb-2">
                <span className="bg-gradient-to-r from-romantic-rose to-sunset-coral bg-clip-text text-transparent">
                  Отлично!
                </span>{' '}
                <span>🎉</span>
              </h2>
              
              <div className="space-y-2.5 text-slate-700 text-sm">
                <p className="font-semibold text-slate-600 text-center text-xs">
                  Значит встречаемся:
                </p>
                <div className="flex items-center gap-2.5 bg-white/50 p-2 rounded-xl backdrop-blur-sm">
                  <span className="text-base">📅</span>
                  <span><strong>Дата:</strong> {selectedDate}</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white/50 p-2 rounded-xl backdrop-blur-sm">
                  <span className="text-base">🕒</span>
                  <span><strong>Время:</strong> {selectedTime}</span>
                </div>
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-start gap-2.5 bg-white/50 p-2 rounded-xl backdrop-blur-sm">
                    <span className="text-base">🍕</span>
                    <span><strong>Берем с собой:</strong></span>
                  </div>
                  <ul className="list-disc pl-8 text-slate-600 text-xs space-y-1">
                    {selectedFood.map(food => (
                      <li key={food}>{food}</li>
                    ))}
                    {customFood.trim() && (
                      <li>{customFood.trim()} (свой вариант)</li>
                    )}
                    {selectedFood.length === 0 && !customFood.trim() && (
                      <li className="italic text-slate-400">Ничего не выбрали (поедем голодными? 😋)</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-700 italic px-4 py-2.5 bg-gradient-to-br from-white/80 to-sunset-coral/20 rounded-xl border border-white/70 max-w-[320px] leading-relaxed shadow-sm backdrop-blur-sm">
              Буду ждать этот день с нетерпением. Обещаю хорошее настроение, море, красивые виды и классную компанию. 🌅
            </p>

            <button
              onClick={handleSendAnswer}
              disabled={isSending}
              className="w-full py-3.5 mt-2 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 text-white rounded-full font-bold text-lg shadow-[0_8px_20px_rgba(16,185,129,0.25)] hover:scale-[1.02] active:scale-95 border-2 border-white/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 max-w-[320px] cursor-pointer backdrop-blur-sm"
            >
              {isSending ? (
                <>
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Отправка...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Закинуть ответ Максону</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* --- ЭКРАН 6: УСПЕХ Telegram --- */}
        {currentScreen === 'SUCCESS' && (
          <div className="flex-1 w-full flex flex-col justify-center items-center gap-8 animate-slide-up relative z-10">
            <div className="relative w-28 h-28">
              <div className="absolute inset-0 rounded-full bg-emerald-400/40 blur-2xl animate-pulse-glow" />
              <div className="relative w-28 h-28 bg-gradient-to-br from-white/95 to-emerald-200/60 rounded-full flex justify-center items-center shadow-[0_12px_40px_rgba(16,185,129,0.4)] border-4 border-white/80 animate-pulse-soft backdrop-blur-sm">
                <Check className="w-14 h-14 text-emerald-600 stroke-[4px] drop-shadow-md" />
              </div>
            </div>

            <div className="space-y-4 px-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-sans drop-shadow-sm">
                Ответ успешно отправлен
              </h2>
              <p className="text-sm text-slate-600 bg-white/70 px-5 py-2.5 rounded-full inline-block border-2 border-white/90 font-bold shadow-sm backdrop-blur-sm">
                Теперь отступать уже поздно 😎
              </p>
            </div>

            <p className="text-base text-slate-600 max-w-[280px] leading-relaxed pt-2 bg-gradient-to-br from-white/80 to-ocean-light/30 px-5 py-4 rounded-[24px] border-2 border-white/80 shadow-[0_6px_20px_rgba(135,206,235,0.15)] backdrop-blur-sm">
              Я получил твою весточку на свой радар. Готовь купальник, очки и солнечное настроение(сама ты солнечная)! ☀️👙🕶️
            </p>
          </div>
        )}

        {/* Романтичный футер */}
        <div className="text-xs text-slate-500/80 mt-auto pt-6 flex items-center gap-1.5 relative z-20 backdrop-blur-sm bg-white/20 px-4 py-2 rounded-full border border-white/40">
          <Heart className="w-3 h-3 text-romantic-rose fill-romantic-rose animate-pulse-soft" />
          <span>специально для Леркувеее</span>
        </div>

      </div>
    </div>
  );
}

export default App;
