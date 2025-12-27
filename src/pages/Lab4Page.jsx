import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Paper, Grid, Card, CardContent, Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import DataObjectIcon from '@mui/icons-material/DataObject';

const Lab4Page = () => {
  const demos = [
    {
      title: 'useState и useEffect',
      path: '/counter-demo',
      icon: <SettingsIcon sx={{ fontSize: 40 }} />,
      desc: 'Работа с состоянием'
    },
    {
      title: 'Redux',
      path: '/redux-demo',
      icon: <DataObjectIcon sx={{ fontSize: 40 }} />,
      desc: 'Глобальное управление состоянием'
    }
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Лабораторная 4: Состояние и Redux
        </Typography>
        <Typography variant="body1" component="p" sx={{ mb: 2 }}>
          Выберите демонстрацию для просмотра:
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {demos.map((demo, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <div style={{ color: '#1976d2', marginBottom: 10 }}>
                    {demo.icon}
                  </div>
                  <Typography variant="h6" gutterBottom>
                    {demo.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" component="p" sx={{ mb: 2 }}>
                    {demo.desc}
                  </Typography>
                  <Button 
                    component={Link} 
                    to={demo.path}
                    variant="contained" 
                    fullWidth
                  >
                    Перейти
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Lab4Page;