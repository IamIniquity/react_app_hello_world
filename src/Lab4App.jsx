import { Routes, Route } from 'react-router-dom';
import Layout from './navigation/Layout';
import CounterWithEffects from './components/CounterWithEffects';
import Lab5App from './Lab5App';
import Lab6App from './Lab6App';

const Lab4App = () => {
  return (
    <Routes>
      <Route path="/*" element={<Layout />} />
      <Route path="/counter-demo" element={<CounterWithEffects />} />
      <Route path="/lab5" element={<Lab5App />} />
      <Route path="/lab6" element={<Lab6App />} />
    </Routes>
  );
};

export default Lab4App;