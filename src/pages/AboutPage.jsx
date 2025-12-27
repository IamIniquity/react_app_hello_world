import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const AboutPage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          О себе
        </Typography>
        
        <Typography variant="body1" paragraph>
          Это проект лабораторных работ по разработке на React.
        </Typography>
        
        <Typography variant="body1" paragraph>
          Проект включает в себя:
        </Typography>
        
        <Box component="ul" sx={{ pl: 3 }}>
          <li><Typography variant="body1">Навигацию между страницами</Typography></li>
          <li><Typography variant="body1">Переключение тем (светлая/темная)</Typography></li>
          <li><Typography variant="body1">Формы с валидацией</Typography></li>
          <li><Typography variant="body1">Работу с REST API</Typography></li>
          <li><Typography variant="body1">Управление состоянием через Redux</Typography></li>
          <li><Typography variant="body1">Адаптивный дизайн</Typography></li>
          <li><Typography variant="body1">Лабораторная 3 интегрирована в проект</Typography></li>
        </Box>
        
        <Typography variant="body1" sx={{ mt: 3 }}>
          Все лабораторные работы представляют собой поэтапное развитие одного приложения.
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutPage;