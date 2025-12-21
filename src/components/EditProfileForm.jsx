import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as apiService from '../api/apiService';

const EditProfileForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (!user) return;
    
    const updatedUser = {
      ...user,
      name: name || user.username,
      email: email || user.email,
    };
    
    // PUT запрос на сервер для редактирования профиля
    apiService.updateUser(user.id, updatedUser)
      .then(updatedData => {
        alert('Профиль обновлен на сервере!');
      })
      .catch(error => {
        alert('Ошибка обновления профиля: ' + error.message);
      });
    
  }, [user, name, email]);

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit} className="edit-profile-form">
      <h3>Редактирование профиля</h3>
      
      <div className="form-group">
        <label>Имя:</label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введите email"
        />
      </div>

      <div className="form-buttons">
        <button type="submit">Обновить профиль</button>
      </div>
    </form>
  );
};

export default EditProfileForm;