import React, { useState, useEffect } from 'react';
import './Stoper.css';

function Stoper() {
  const [uplywajacyCzas, setUplywajacyCzas] = useState(0);
  const [stoperDziala, setStoperDziala] = useState(false);
  const [czasRozpoczecia, setCzasRozpoczecia] = useState(null);

  const startStoper = () => {
    if (!stoperDziala) {
      setCzasRozpoczecia(Date.now() - uplywajacyCzas);
      setStoperDziala(true);
    }
  };

  const pauzaStoper = () => {
    setStoperDziala(false);
    setUplywajacyCzas(Date.now() - czasRozpoczecia);
  };

  const resetujStoper = () => {
    setStoperDziala(false);
    setUplywajacyCzas(0);
  };

  useEffect(() => {
    let intervalId;
    if (stoperDziala) {
      intervalId = setInterval(() => {
        setUplywajacyCzas(Date.now() - czasRozpoczecia);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [stoperDziala, czasRozpoczecia]);

  const formatujCzas = czas => {
    const godziny = Math.floor(czas / 3600000);
    const minuty = Math.floor((czas % 3600000) / 60000);
    const sekundy = Math.floor((czas % 60000) / 1000);
    return `${godziny.toString().padStart(2, '0')}:${minuty
      .toString()
      .padStart(2, '0')}:${sekundy.toString().padStart(2, '0')}`;
  };

  return (
    <div className="stoper-container">
      <h2>Stoper</h2>
      <div>{formatujCzas(uplywajacyCzas)}</div>
      <button onClick={startStoper}>Start</button>
      <button onClick={pauzaStoper}>Pauza</button>
      <button onClick={resetujStoper}>Reset</button>
    </div>
  );
}

export default Stoper;
