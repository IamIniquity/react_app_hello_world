import { useState, useEffect } from 'react';

const CounterWithEffects = () => {
  const [count, setCount] = useState(0);

  //простой useEffect на монтировании
  useEffect(() => {
    console.log('Компонент загружен');
    
    return () => {
      console.log('Компонент будет удален');
    };
  }, []);

  return (
    <div>
      <h3>Счетчик: {count}</h3>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
};

export default CounterWithEffects;