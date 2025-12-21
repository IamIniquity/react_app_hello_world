import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Добавляем
import { login } from '../redux/slices/authSlice';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Добавляем
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    // Валидация
    if (password !== confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }
    
    if (password.length < 6) {
      alert('Пароль должен быть не менее 6 символов');
      return;
    }
    
    // Регистрация успешна - логиним пользователя
    dispatch(login({ 
      username: email, 
      name: name || email.split('@')[0]
    }));
    alert('Регистрация успешна!');
    navigate('/lab5'); // Добавляем редирект
    
  }, [email, name, password, confirmPassword, dispatch, navigate]); // Добавляем navigate

  const handleClear = useCallback(() => {
    setEmail('');
    setName('');
    setPassword('');
    setConfirmPassword('');
  }, []);

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Форма регистрации</h2>
      
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
      </div>

      <div>
        <label>Имя (необязательно):</label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label>Пароль (мин. 6 символов):</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
          minLength="6"
        />
      </div>

      <div>
        <label>Подтвердите пароль:</label>
        <input 
          type="password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required 
        />
      </div>

      <button type="submit">Зарегистрироваться</button>
      <button type="button" onClick={handleClear}>
        Очистить форму
      </button>
    </form>
  );
};

export default RegisterForm;