import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NewHeader from './NewHeader';
import LabDrawer from './LabDrawer';
import { Box } from '@mui/material';

const MainLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NewHeader onMenuClick={() => setDrawerOpen(true)} />
      <LabDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: { xs: 2, sm: 3 },
        maxWidth: '1200px',
        mx: 'auto',
        width: '100%'
      }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;