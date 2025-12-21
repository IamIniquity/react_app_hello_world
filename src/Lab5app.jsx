import useLoginState from './hooks/useLoginState';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import UserProfile from './components/UserProfile'; // Добавляем

const Lab5App = () => {
  const isLoggedIn = useLoginState();

  // Если не авторизован
  if (!isLoggedIn) {
    return (
      <div className="lab5-container">
        <h2>Лабораторная 5: Формы и авторизация</h2>
        <div className="lab5-forms">
          <div className="form-section">
            <LoginForm />
          </div>
          <div className="form-section">
            <RegisterForm />
          </div>
        </div>
        <p className="hint">* Войдите или зарегистрируйтесь чтобы получить доступ</p>
      </div>
    );
  }

  // Если авторизован показываем только обратную связь
  return (
    <div className="lab5-container">
      <div className="lab5-header">
        <h2>Лабораторная 5: Формы и авторизация</h2>
        <UserProfile />
      </div>
      
      <p className="welcome-message">Добро пожаловать! Теперь вы можете оставлять отзывы.</p>
      
      <div className="feedback-section">
        <div className="form-section">
          <FeedbackForm />
        </div>
        <div className="form-section">
          <FeedbackList />
        </div>
      </div>
    </div>
  );
};

export default Lab5App;