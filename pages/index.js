import { useState, useEffect } from 'react';

const symbols = ['🍒', '🔔', '7️⃣', '🍋', '⭐', '💎'];

const getRandomSymbols = () =>
  Array(3)
    .fill()
    .map(() => symbols[Math.floor(Math.random() * symbols.length)]);

export default function Home() {
  const [slots, setSlots] = useState(['', '', '']);
  const [spinning, setSpinning] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  const spin = () => {
    setSpinning(true);
    setHasWon(false);

    const interval = setInterval(() => {
      setSlots(getRandomSymbols());
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const finalSymbols = ['💎', '💎', '💎'];
      setSlots(finalSymbols);
      setSpinning(false);
      setHasWon(true);
    }, 2000);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#7D5FFF',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        textAlign: 'center'
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>🎰 Испытай удачу</h1>

      <div
        style={{
          display: 'flex',
          gap: '20px',
          fontSize: '4rem',
          background: 'white',
          color: '#000',
          padding: '10px 30px',
          borderRadius: '10px',
          minWidth: '200px',
          justifyContent: 'center'
        }}
      >
        {slots.map((s, i) => (
          <div key={i} style={{ borderLeft: i !== 0 ? '2px solid #ccc' : 'none', padding: '0 10px' }}>
            {s}
          </div>
        ))}
      </div>

      {!hasWon ? (
        <button
          onClick={spin}
          disabled={spinning}
          style={{
            marginTop: '30px',
            padding: '12px 25px',
            fontSize: '1.2rem',
            borderRadius: '8px',
            background: 'white',
            color: '#7D5FFF',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          🎯 Крутить
        </button>
      ) : (
        <div style={{ marginTop: '30px' }}>
          <h2 style={{ fontSize: '2rem' }}>🎉 Поздравляем! Вы выиграли 7777₽</h2>
          <p style={{ fontSize: '1.5rem' }}>Комбинация: {slots.join(' ')}</p>
          <button
            style={{
              marginTop: '20px',
              padding: '12px 25px',
              fontSize: '1.2rem',
              borderRadius: '8px',
              background: '#fff',
              color: '#7D5FFF',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() => window.Telegram?.WebApp?.close?.()}
          >
            Забрать выигрыш
          </button>
        </div>
      )}
    </div>
  );
}
