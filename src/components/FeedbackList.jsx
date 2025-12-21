import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedback, removeFeedback } from '../redux/slices/apiSlice';

const FeedbackList = () => {
  const dispatch = useDispatch();
  const { feedback, loading } = useSelector((state) => state.api);
  const user = useSelector((state) => state.auth.user);

  // Загружаем отзывы при монтировании компонента с помощью useEffect в как лабораторной 4
  useEffect(() => {
    dispatch(fetchFeedback());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Удалить этот отзыв?')) {
      dispatch(removeFeedback(id));
    }
  };

  if (loading) {
    return (
      <div className="feedback-list">
        <h3>Загрузка отзывов...</h3>
      </div>
    );
  }

  if (feedback.length === 0) {
    return (
      <div className="feedback-list">
        <h3>Список отзывов с сервера</h3>
        <p>Отзывов пока нет</p>
      </div>
    );
  }

  return (
    <div className="feedback-list">
      <h3>Отзывы с сервера ({feedback.length})</h3>
      
      <div className="feedback-items">
        {feedback.map(item => (
          <div key={item.id} className="feedback-item">
            <div className="feedback-header">
              <div className="feedback-rating">
                {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
              </div>
              {user && (
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="delete-btn"
                >
                  Удалить
                </button>
              )}
            </div>
            <div className="feedback-message">{item.message}</div>
            <div className="feedback-author">
              {item.name} ({item.email})
            </div>
            <div className="feedback-date">
              {new Date(item.date).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;