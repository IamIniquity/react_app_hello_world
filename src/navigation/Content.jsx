import { useLocation } from 'react-router-dom';
import Lab2App from '../Lab2App';
import CounterWithEffects from '../components/CounterWithEffects';
import ReduxCounter from '../components/ReduxCounter';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import FeedbackForm from '../components/FeedbackForm'; // Добавляем импорт
import FeedbackList from '../components/FeedbackList'; // Добавляем импорт

const Content = () => {
  const location = useLocation();
  
  const openFirstLab = () => {
    window.open('/first.html', '_blank');
  };

  // Главная
  if (location.pathname === '/') {
    return (
      <div className="content">
        <h2>Лабораторная работа 4</h2>
        <p>Задачи:</p>
        <ul>
          <li>навигация между страницами</li>
          <li>переключение темы (день/ночь)</li>
          <li>useState и useEffect</li>
          <li>Redux</li>
        </ul>
      </div>
    );
  }

  // Лаб1
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

  // Лаб 2
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

  // счетчик
  if (location.pathname === '/counter-demo') {
    return (
      <div className="content">
        <h2>useState и useEffect</h2>
        <p>Простой счетчик</p>
        <CounterWithEffects />
      </div>
    );
  }

  // redux
  if (location.pathname === '/redux-demo') {
    return (
      <div className="content">
        <h2>Redux</h2>
        <p>Глобальное управление состоянием</p>
        <ReduxCounter />
      </div>
    );
  }

  // Лаб5
  if (location.pathname === '/lab5') {
  return <Lab5App />;
}

  // Если не найден путь
  return (
    <div className="content">
      <h2>Страница не найдена</h2>
      <p>Путь "{location.pathname}" не существует</p>
    </div>
  );
};

export default Content;