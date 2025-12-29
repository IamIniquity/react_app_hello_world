import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedback } from '../redux/slices/apiSlice';
import { Box, Typography, Card, CardContent, Rating, Button, Chip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const FeedbackListReadOnly = () => {
  const dispatch = useDispatch();
  const { feedback } = useSelector((state) => state.api);
  const [sortType, setSortType] = useState('dateDesc'); // dateAsc, dateDesc, ratingAsc, ratingDesc

  useEffect(() => {
    dispatch(fetchFeedback());
  }, [dispatch]);

  const sortedFeedback = useMemo(() => {
    const approved = feedback.filter(item => item.status === 'approved');
    
    return [...approved].sort((a, b) => {
      if (sortType.includes('date')) {
        const aDate = new Date(a.date).getTime();
        const bDate = new Date(b.date).getTime();
        return sortType === 'dateDesc' ? bDate - aDate : aDate - bDate;
      } else {
        return sortType === 'ratingDesc' ? b.rating - a.rating : a.rating - b.rating;
      }
    });
  }, [feedback, sortType]);

  if (!sortedFeedback.length) {
    return <Typography>Нет одобренных отзывов</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Отзывы ({sortedFeedback.length})</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            size="small" 
            variant={sortType === 'dateDesc' ? 'contained' : 'outlined'}
            startIcon={<AccessTimeIcon />}
            endIcon={<ArrowDownwardIcon />}
            onClick={() => setSortType('dateDesc')}
          >
            Новые
          </Button>
          <Button 
            size="small" 
            variant={sortType === 'dateAsc' ? 'contained' : 'outlined'}
            startIcon={<AccessTimeIcon />}
            endIcon={<ArrowUpwardIcon />}
            onClick={() => setSortType('dateAsc')}
          >
            Старые
          </Button>
          <Button 
            size="small" 
            variant={sortType === 'ratingDesc' ? 'contained' : 'outlined'}
            startIcon={<StarIcon />}
            endIcon={<ArrowDownwardIcon />}
            onClick={() => setSortType('ratingDesc')}
          >
            Высокий рейтинг
          </Button>
          <Button 
            size="small" 
            variant={sortType === 'ratingAsc' ? 'contained' : 'outlined'}
            startIcon={<StarIcon />}
            endIcon={<ArrowUpwardIcon />}
            onClick={() => setSortType('ratingAsc')}
          >
            Низкий рейтинг
          </Button>
        </Box>
      </Box>

      {sortedFeedback.map(item => (
        <Card key={item.id} sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Rating value={item.rating} readOnly size="small" />
              <Typography variant="caption" color="text.secondary">
                {new Date(item.date).toLocaleDateString()}
              </Typography>
            </Box>
            <Typography>{item.message}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              — {item.name}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default FeedbackListReadOnly;