import React, { useState, useCallback } from 'react';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    // Валидация
    if (!name || !email || !message) {
      alert('Заполните все обязательные поля!');
      return;
    }
    
    // Получаем существующие отзывы из localStorage
    const existingFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
    
    // Добавляем новый отзыв
    const newFeedback = {
      id: Date.now(),
      name,
      email,
      message,
      rating,
      date: new Date().toLocaleString(),
    };
    
    const updatedFeedback = [...existingFeedback, newFeedback];
    localStorage.setItem('feedback', JSON.stringify(updatedFeedback));
    
    alert('Спасибо за ваш отзыв!');
    
    // Очищаем форму
    setName('');
    setEmail('');
    setMessage('');
    setRating(5);
    
  }, [name, email, message, rating]);

  const handleClear = useCallback(() => {
    setName('');
    setEmail('');
    setMessage('');
    setRating(5);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <h2>Форма обратной связи</h2>
      
      <div>
        <label>Ваше имя *:</label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required 
        />
      </div>

      <div>
        <label>Email *:</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
      </div>

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
        />
      </div>

      <button type="submit">Отправить отзыв</button>
      <button type="button" onClick={handleClear}>
        Очистить форму
      </button>
    </form>
  );
};

export default FeedbackForm;