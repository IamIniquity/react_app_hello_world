import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFeedback } from '../redux/slices/apiSlice';
import { 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Box, 
  Alert,
  Snackbar 
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const FeedbackForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!message.trim()) {
      alert('Введите сообщение!');
      return;
    }

    const feedbackData = {
      name: user?.name || user?.username || 'Пользователь',
      email: user?.email || 'user@example.com',
      message: message.trim(),
      rating,
      status: 'pending', // Статус "на рассмотрении"
      date: new Date().toISOString(),
      userId: user?.id
    };

    dispatch(addFeedback(feedbackData))
      .then(() => {
        setSnackbar({ 
          open: true, 
          message: 'Отзыв отправлен на модерацию. Он появится после одобрения администратором.' 
        });
        setMessage('');
        setRating(5);
      })
      .catch(() => {
        setSnackbar({ 
          open: true, 
          message: 'Ошибка при отправке отзыва',
          severity: 'error'
        });
      });
  }, [message, rating, user, dispatch]);

  const handleClear = () => {
    setMessage('');
    setRating(5);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
          {[1,2,3,4,5].map(num => (
            <MenuItem key={num} value={num}>
              {Array(num).fill('★').join('')} ({num})
            </MenuItem>
          ))}
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
        placeholder="Напишите ваш отзыв здесь..."
      />
      
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button type="submit" variant="contained" fullWidth>
          Отправить на модерацию
        </Button>
        <Button type="button" variant="outlined" onClick={handleClear} fullWidth>
          Очистить
        </Button>
      </Box>

      <Box sx={{ mt: 2, p: 1, bgcolor: 'info.50', borderRadius: 1 }}>
        <Alert icon={<CheckCircleIcon fontSize="small" />} severity="info">
          Ваш отзыв будет проверен администратором перед публикацией.
        </Alert>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity || "success"}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FeedbackForm;