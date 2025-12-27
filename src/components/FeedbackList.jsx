import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedback, removeFeedback } from '../redux/slices/apiSlice';
import { Box, Typography, Button, Card, CardContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FeedbackList = () => {
  const dispatch = useDispatch();
  const { feedback, loading } = useSelector((state) => state.api);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchFeedback());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Удалить этот отзыв?')) {
      dispatch(removeFeedback(id));
    }
  };

  if (loading) return <Typography>Загрузка отзывов...</Typography>;
  if (feedback.length === 0) return <Typography>Отзывов пока нет</Typography>;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Отзывы с сервера ({feedback.length})
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {feedback.map(item => (
          <Card key={item.id} variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <Typography color="text.secondary">
                  {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                </Typography>
                {user && (
                  <IconButton size="small" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
              <Typography sx={{ mt: 1, fontStyle: 'italic' }}>{item.message}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {item.name} ({item.email})
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                {new Date(item.date).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default FeedbackList;