import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Card, CardContent, Grid } from '@mui/material';

const HomePage = () => {
  const labs = [
    { num: 1, title: 'HTML страница', path: '/lab1' },
    { num: 2, title: 'React приложение', path: '/lab2' },
    { num: 4, title: 'Состояние и Redux', path: '/lab4' }, // Лаба 4
    { num: 5, title: 'Формы', path: '/lab5' },
    { num: 6, title: 'REST API', path: '/lab6' },
    { num: 7, title: 'UI Kit', path: '/' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Лабораторные работы
      </Typography>
      
      <Grid container spacing={2}>
        {labs.map((lab) => (
          <Grid item xs={12} sm={6} md={4} key={lab.num}>
            <Card>
              <CardContent>
                <Typography variant="h6">Лабораторная {lab.num}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {lab.title}
                </Typography>
                <Button component={Link} to={lab.path} variant="outlined" size="small" fullWidth>
                  Перейти
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;