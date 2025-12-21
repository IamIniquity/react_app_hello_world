import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/authSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (username === 'admin' && password === 'admin') {
      dispatch(login({ 
        username, 
        password, 
        rememberMe 
      }));
      alert('Успешная авторизация!');
      navigate('/lab5');
      window.location.reload();
    } else {
      alert('Неверное имя пользователя или пароль.');
    }
  }, [username, password, rememberMe, dispatch, navigate]);

  const handleClear = useCallback(() => {
    setUsername('');
    setPassword('');
    setRememberMe(false);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Форма авторизации</h2>
      
      <div className="form-group">
        <label>Имя пользователя:</label>
        <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required 
        />
      </div>

      <div className="form-group">
        <label>Пароль:</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
      </div>

      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input 
            type="checkbox" 
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="checkbox-input"
          />
          <span className="checkbox-text">Запомнить меня</span>
        </label>
      </div>

      <div className="form-buttons">
        <button type="submit">Войти</button>
        <button type="button" onClick={handleClear}>
          Очистить форму
        </button>
      </div>
    </form>
  );
};

export default LoginForm;