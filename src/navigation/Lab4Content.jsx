import { useLocation } from 'react-router-dom';
import Lab2App from '../Lab2App';
import CounterWithEffects from '../components/CounterWithEffects';
import ReduxCounter from '../components/ReduxCounter';

const Lab4Content = () => {
  const location = useLocation();
  
  const openFirstLab = () => {
    window.open('/first.html', '_blank');
  };

  // c 1 по 4 лаб
  if (location.pathname === '/lab1') {
    return (
      <div className="content">
        <h2>Лабораторная 1: Базовая HTML страница</h2>
        <p>HTML страница с полем аутентификации и счётчиком</p>
        <button onClick={openFirstLab} className="lab-button">
          Перейти на страницу
        </button>
      </div>
    );
  }

  if (location.pathname === '/lab2') {
    return (
      <div className="content">
        <h2>Лабораторная 2: Hello World приложение</h2>
        <p>React приложение</p>
        <div className="lab2-demo">
          <Lab2App />
        </div>
      </div>
    );
  }

  if (location.pathname === '/counter-demo') {
    return (
      <div className="content">
        <h2>useState и useEffect</h2>
        <p>Простой счетчик</p>
        <CounterWithEffects />
      </div>
    );
  }

  if (location.pathname === '/redux-demo') {
    return (
      <div className="content">
        <h2>Redux</h2>
        <p>Глобальное управление состоянием</p>
        <ReduxCounter />
      </div>
    );
  }

  return (
    <div className="content">
      <h2>Страница не найдена</h2>
      <p>Путь "{location.pathname}" не существует</p>
    </div>
  );
};

export default Lab4Content;