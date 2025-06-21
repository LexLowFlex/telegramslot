import { useState } from 'react';

const symbols = ['🍒', '🔔', '7️⃣', '🍋', '⭐', '💎'];

const getRandomSymbols = () =>
  Array(3).fill().map(() => symbols[Math.floor(Math.random() * symbols.length)]);

const [slots, setSlots] = useState(getRandomSymbols());

export default function Home() {
  const [slots, setSlots] = useState(['', '', '']);
  const [spinning, setSpinning] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  const spin = () => {
    setSpinning(true);
    setHasWon(false);

    const interval = setInterval(() => {
      setSlots([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ]);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setSlots(['7️⃣', '7️⃣', '7️⃣']);
      setSpinning(false);
      setHasWon(true);
    }, 2000);
  };

  return (
    <div
      style={{
        background: '#7A5FFF',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: '1rem',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎰 Испытай удачу</h1>

      <div
        style={{
          display: 'flex',
          fontSize: '4rem',
          background: '#fff',
          padding: '1rem 2rem',
          borderRadius: '10px',
          marginBottom: '1.5rem',
          color: '#000',
        }}
      >
        {slots.map((s, i) => (
          <span key={i} style={{ margin: '0 0.5rem' }}>
            {s}
            {i < slots.length - 1 && <span style={{ margin: '0 0.5rem' }}>|</span>}
          </span>
        ))}
      </div>

      {!hasWon && (
        <button
          onClick={spin}
          disabled={spinning}
          style={{
            fontSize: '1.5rem',
            padding: '1rem 2rem',
            background: '#fff',
            color: '#5e3eff',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            marginBottom: '1rem',
          }}
        >
          {spinning ? 'Крутится...' : '🎯 Крутить'}
        </button>
      )}

      {hasWon && (
        <>
          <p style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            🎉 Поздравляем! Вы выиграли <strong>7777₽</strong>
          </p>
          <button
            onClick={() =>
              window.open('https://partredivada.com/?promo=d4c4edc2-ca8c-4938-8db4-e976a26b68a2', '_blank')
            }
            style={{
              fontSize: '1.5rem',
              padding: '1rem 2rem',
              background: '#fff',
              color: '#5e3eff',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
            }}
          >
            Забрать выигрыш
          </button>
        </>
      )}
    </div>
  );
}
