import { Routes, Route } from 'react-router-dom';
import MainLayout from './navigation/MainLayout';
import HomePage from './pages/HomePage';
import Lab4Page from './pages/Lab4Page';
import Lab4Content from './navigation/Lab4Content';
import Lab5App from './Lab5App';
import Lab6App from './Lab6App';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';
import CounterWithEffects from './components/CounterWithEffects';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="lab4" element={<Lab4Page />} />
        <Route path="lab1" element={<Lab4Content />} />
        <Route path="lab2" element={<Lab4Content />} />
        <Route path="counter-demo" element={<CounterWithEffects />} />
        <Route path="redux-demo" element={<Lab4Content />} />
        <Route path="lab5" element={<Lab5App />} />
        <Route path="lab6" element={<Lab6App />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
};

export default App;