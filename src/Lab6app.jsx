import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Layout from './navigation/Layout';
import useLoginState from './hooks/useLoginState';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import EditProfileForm from './components/EditProfileForm';
import UserProfile from './components/UserProfile';

const Lab6App = () => {
  const isLoggedIn = useLoginState();
  const user = useSelector((state) => state.auth.user);

  // Если не авторизован
  if (!isLoggedIn) {
    return (
      <div className="lab6-container">
        <h2>Лабораторная 6: REST API</h2>
        <p>Формы с отправкой на REST сервер</p>
        <div className="lab6-forms">
          <div className="form-section">
            <LoginForm />
          </div>
          <div className="form-section">
            <RegisterForm />
          </div>
        </div>
      </div>
    );
  }

  // Если авторизован
  return (
    <div className="lab6-container">
      <div className="lab6-header">
        <h2>Лабораторная 6: REST API</h2>
        <UserProfile />
      </div>
      
      <p className="welcome-message">
        Работаем с REST API сервером
      </p>
      
      <div className="api-sections">
        <div className="form-section">
          <h3>Профиль и API запросы</h3>
          <EditProfileForm />
        </div>
        
        <div className="form-section">
          <h3>Обратная связь (REST)</h3>
          <FeedbackForm />
        </div>
      </div>
      
      <div className="feedback-section">
        <div className="form-section wide">
          <FeedbackList />
        </div>
      </div>
    </div>
  );
};

export default Lab6App;