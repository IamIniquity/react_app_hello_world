import { Routes, Route } from 'react-router-dom';
import MainLayout from './navigation/MainLayout';
import CounterWithEffects from './components/CounterWithEffects';
import Lab5App from './Lab5App';
import Lab6App from './Lab6App';
import AboutPage from './pages/AboutPage';
import Content from './navigation/Content';

const Lab4App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Content />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="counter-demo" element={<CounterWithEffects />} />
        <Route path="lab5" element={<Lab5App />} />
        <Route path="lab6" element={<Lab6App />} />
        <Route path="lab1" element={<Content />} />
        <Route path="lab2" element={<Content />} />
        <Route path="redux-demo" element={<Content />} />
      </Route>
    </Routes>
  );
};

export default Lab4App;