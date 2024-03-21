import React, { useState, useEffect } from 'react';
import './Timer.css';

function Timer() {
  const [czasWejsciowy, setCzasWejsciowy] = useState('');
  const [pozostalyCzas, setPozostalyCzas] = useState(null);
  const [timerDziala, setTimerDziala] = useState(false);
  const [jednostkaCzasu, setJednostkaCzasu] = useState('minuty');

  const startTimer = () => {
    let sekundy;
    if (jednostkaCzasu === 'godziny') {
      sekundy = parseInt(czasWejsciowy) * 3600;
    } else {
      sekundy = parseInt(czasWejsciowy) * 60;
    }
    setPozostalyCzas(sekundy);
    setTimerDziala(true);
  };

  useEffect(() => {
    let intervalId;
    if (timerDziala) {
      intervalId = setInterval(() => {
        setPozostalyCzas(prevPozostalyCzas => {
          if (prevPozostalyCzas === 0) {
            clearInterval(intervalId);
            setTimerDziala(false);
            alert('Czas minął!');
            return null;
          }
          return prevPozostalyCzas - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timerDziala]);

  const formatujCzas = czas => {
    const godziny = Math.floor(czas / 3600);
    const minuty = Math.floor((czas % 3600) / 60);
    const sekundy = czas % 60;
    return `${godziny.toString().padStart(2, '0')}:${minuty
      .toString()
      .padStart(2, '0')}:${sekundy.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-container">
      <h2>Timer</h2>
      <input
        type="number"
        value={czasWejsciowy}
        onChange={e => setCzasWejsciowy(e.target.value)}
        placeholder="Podaj czas"
      />
      <select
        value={jednostkaCzasu}
        onChange={e => setJednostkaCzasu(e.target.value)}
      >
        <option value="minuty">Minuty</option>
        <option value="godziny">Godziny</option>
      </select>
      <button onClick={startTimer}>Start</button>
      <div>{pozostalyCzas !== null && formatujCzas(pozostalyCzas)}</div>
    </div>
  );
}

export default Timer;
