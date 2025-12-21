import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../redux/slices/counterSlice';

const ReduxCounter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: '20px', border: '2px solid #8b5cf6', borderRadius: '10px' }}>
      <h3>Redux Counter</h3>
      <p>Глобальное состояние:</p>
      
      <div style={{ 
        fontSize: '36px', 
        fontWeight: 'bold', 
        color: '#7c3aed',
        margin: '20px 0'
      }}>
        {count}
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={() => dispatch(increment())}>
          +1 (increment)
        </button>
        
        <button onClick={() => dispatch(decrement())}>
          -1 (decrement)
        </button>
        
        <button onClick={() => dispatch(reset())}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default ReduxCounter;