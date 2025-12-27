import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFeedback } from '../redux/slices/apiSlice';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

const FeedbackForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!message) {
      alert('Введите сообщение!');
      return;
    }
    const feedbackData = {
      name: user?.name || user?.username || 'Пользователь',
      email: user?.email || 'user@example.com',
      message, rating,
      date: new Date().toISOString(),
    };
    dispatch(addFeedback(feedbackData))
      .then(() => {
        alert('Отзыв отправлен на сервер');
        setMessage('');
        setRating(5);
      })
      .catch(() => alert('Ошибка при отправке'));
  }, [message, rating, user, dispatch]);

  const handleClear = () => {
    setMessage('');
    setRating(5);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
      <FormControl fullWidth margin="normal">
        <InputLabel shrink>Оценка</InputLabel>
        <Select 
          value={rating} 
          label="Оценка" 
          onChange={(e) => setRating(e.target.value)}
        >
          {[1,2,3,4,5].map(num => <MenuItem key={num} value={num}>{num} ★</MenuItem>)}
        </Select>
      </FormControl>
      <TextField 
        fullWidth 
        label="Сообщение" 
        value={message} 
        multiline 
        rows={4}
        onChange={(e) => setMessage(e.target.value)} 
        margin="normal" 
        required
        slotProps={{
          inputLabel: { shrink: true }
        }}
      />
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button type="submit" variant="contained" fullWidth>Отправить</Button>
        <Button type="button" variant="outlined" onClick={handleClear} fullWidth>Очистить</Button>
      </Box>
    </Box>
  );
};

export default FeedbackForm;