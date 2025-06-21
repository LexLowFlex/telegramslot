import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const symbols = ['🍒', '🔔', '7️⃣', '🍋', '⭐', '💎'];

const getRandomSymbols = () =>
  Array(3)
    .fill()
    .map(() => symbols[Math.floor(Math.random() * symbols.length)]);

export default function Home() {
  const [slots, setSlots] = useState(['', '', '']);
  const [spinning, setSpinning] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [showClaimButton, setShowClaimButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (hasWon) {
      confetti();
      setShowClaimButton(true);
    }
  }, [hasWon]);

  const spin = () => {
    setSpinning(true);
    setHasWon(false);
    setShowClaimButton(false);

    const interval = setInterval(() => {
      setSlots([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ]);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const finalSymbols = ['7️⃣', '7️⃣', '7️⃣'];
      setSlots(finalSymbols);
      setSpinning(false);
      setHasWon(true);
    }, 2000);
  };

  const claimPrize = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.openLink(
          'https://partredivada.com/?promo=d4c4edc2-ca8c-4938-8db4-e976a26b68a2'
        );
      } else {
        window.location.href =
          'https://partredivada.com/?promo=d4c4edc2-ca8c-4938-8db4-e976a26b68a2';
      }
    }, 1000);
  };

  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: '#7b5cff',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        padding: '1rem',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2rem' }}>🎰 Испытай удачу</h1>

      <div
        style={{
          fontSize: '3rem',
          backgroundColor: 'white',
          color: 'black',
          padding: '1rem 2rem',
          borderRadius: '1rem',
          margin: '1rem 0',
          minWidth: '200px',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        {slots.map((s, i) => (
          <span key={i}>{s || '|'}</span>
        ))}
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        style={{
          fontSize: '1.2rem',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          backgroundColor: 'white',
          color: '#5c1aff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        🎯 Крутить
      </button>

      {hasWon && (
        <h2 style={{ marginTop: '1rem' }}>
          🎉 Поздравляем! Вы выиграли <strong>7777₽</strong>
        </h2>
      )}

      {showClaimButton && (
        <button
          onClick={claimPrize}
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: 'white',
            color: '#7b5cff',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
          }}
        >
          Забрать выигрыш
        </button>
      )}

      {isLoading && (
        <div style={{ marginTop: '2rem', fontSize: '1.1rem' }}>
          ⏳ Переход к офферу...
        </div>
      )}
    </div>
  );
}
