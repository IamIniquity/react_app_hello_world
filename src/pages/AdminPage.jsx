import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Container, Typography, Paper, Tabs, Tab, Box } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleIcon from '@mui/icons-material/People';
import FeedbackIcon from '@mui/icons-material/Feedback';
import UsersTable from '../components/admin/UsersTable';
import FeedbackTable from '../components/admin/FeedbackTable';

const AdminPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const { role } = useSelector((state) => state.auth);

  if (role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <AdminPanelSettingsIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Typography variant="h4">Административная панель</Typography>
        </Box>

        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ mb: 3 }}>
          <Tab icon={<PeopleIcon />} label="Пользователи" />
          <Tab icon={<FeedbackIcon />} label="Отзывы" />
        </Tabs>

        {tabValue === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>Управление пользователями</Typography>
            <UsersTable />
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>Управление отзывами</Typography>
            <FeedbackTable />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default AdminPage;