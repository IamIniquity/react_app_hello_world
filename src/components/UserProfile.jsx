import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { 
  Avatar, 
  IconButton, 
  Menu, 
  MenuItem, 
  Button, 
  Box, 
  Typography,
  Divider 
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user, role } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLoginClick = () => {
    navigate('/lab5');
  };

  // кнопка "войти", если не авторизован
  if (!isLoggedIn || !user) {
    return (
      <Button 
        color="inherit" 
        startIcon={<LoginIcon />}
        onClick={handleLoginClick}
        sx={{ ml: 2 }}
      >
        Войти
      </Button>
    );
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate('/');
  };

  const handleAdminClick = () => {
    handleMenuClose();
    navigate('/admin');
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
        <Typography 
          variant="body2" 
          sx={{ 
            mr: 1, 
            display: { xs: 'none', md: 'block' },
            maxWidth: '150px',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {user.name || user.username}
          {role === 'admin' && ' (Admin)'}
        </Typography>
        
        <IconButton 
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{ p: 0 }}
        >
          <Avatar 
            sx={{ 
              bgcolor: role === 'admin' ? 'secondary.main' : 'primary.main', 
              width: 36, 
              height: 36,
              fontSize: '1rem'
            }}
          >
            {role === 'admin' ? 'A' : user.name?.[0]?.toUpperCase() || user.username?.[0]?.toUpperCase()}
          </Avatar>
        </IconButton>
      </Box>

      <Menu 
        anchorEl={anchorEl} 
        open={Boolean(anchorEl)} 
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem disabled sx={{ opacity: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {user.name || user.username}
              {role === 'admin' && (
                <AdminPanelSettingsIcon color="secondary" fontSize="small" />
              )}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user.email}
            </Typography>
            <Typography variant="caption" display="block" color={role === 'admin' ? 'secondary.main' : 'primary.main'}>
              {role === 'admin' ? 'Администратор' : 'Пользователь'}
            </Typography>
          </Box>
        </MenuItem>

        <Divider sx={{ my: 1 }} />

        {/* Кнопка админки (только для админов) */}
        {role === 'admin' && (
          <MenuItem onClick={handleAdminClick}>
            <AdminPanelSettingsIcon sx={{ mr: 1, fontSize: 20 }} color="secondary" />
            Админ-панель
          </MenuItem>
        )}

        <Divider sx={{ my: 1 }} />

        {/* Кнопка выхода */}
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
          <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
          Выйти
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserProfile;