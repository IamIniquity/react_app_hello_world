import { Routes, Route } from 'react-router-dom';
import Layout from './navigation/Layout';
import CounterWithEffects from './components/CounterWithEffects';

const Lab4App = () => {
  return (
    <Routes>
      <Route path="/*" element={<Layout />} />
      <Route path="/counter-demo" element={<CounterWithEffects />} />
    </Routes>
  );
};

export default Lab4App;