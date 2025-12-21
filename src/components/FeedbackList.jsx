import React, { useState, useEffect } from 'react';

const FeedbackList = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const savedFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
    setFeedbackList(savedFeedback);
  }, []);

  const handleClearAll = () => {
    if (window.confirm('Удалить все отзывы?')) {
      localStorage.removeItem('feedback');
      setFeedbackList([]);
    }
  };

  if (feedbackList.length === 0) {
    return (
      <div className="feedback-list">
        <h3>Список отзывов</h3>
        <p>Отзывов пока нет. Будьте первым!</p>
      </div>
    );
  }

  return (
    <div className="feedback-list">
      <div className="feedback-header">
        <h3>Список отзывов ({feedbackList.length})</h3>
        <button onClick={handleClearAll} className="clear-all-btn">
          Очистить все
        </button>
      </div>
      
      <div className="feedback-items">
        {feedbackList.map(feedback => (
          <div key={feedback.id} className="feedback-item">
            <div className="feedback-rating">
              {'★'.repeat(feedback.rating)}{'☆'.repeat(5 - feedback.rating)}
            </div>
            <div className="feedback-message">{feedback.message}</div>
            <div className="feedback-author">
              {feedback.name} ({feedback.email})
            </div>
            <div className="feedback-date">{feedback.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;