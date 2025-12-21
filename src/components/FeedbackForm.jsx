import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFeedback } from '../redux/slices/apiSlice';

const FeedbackForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Берем пользователя
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (!message) {
      alert('Введите сообщение!');
      return;
    }
    
    // Данные для отправки на сервер
    const feedbackData = {
      name: user?.name || user?.username || 'Аноним',
      email: user?.email || 'anon@example.com',
      message,
      rating,
      date: new Date().toISOString(),
    };
    
    // Отправляем на сервер через Redux
    dispatch(addFeedback(feedbackData))
      .then(() => {
        alert('Отзыв отправлен на сервер!');
        setMessage('');
        setRating(5);
      })
      .catch(() => {
        alert('Ошибка при отправке отзыва');
      });
    
  }, [message, rating, user, dispatch]);

  const handleClear = useCallback(() => {
    setMessage('');
    setRating(5);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <h2>Форма обратной связи (REST API)</h2>
      
      <div>
        <label>Оценка (1-5):</label>
        <select 
          value={rating} 
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num} ★</option>
          ))}
        </select>
      </div>

      <div>
        <label>Сообщение *:</label>
        <textarea 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required 
          rows="4"
          placeholder="Ваш отзыв..."
        />
      </div>

      <div className="form-buttons">
        <button type="submit">Отправить на сервер</button>
        <button type="button" onClick={handleClear}>
          Очистить
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;