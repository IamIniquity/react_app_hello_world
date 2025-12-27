import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);

  if (!isLoggedIn || !user) return null;

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
          {user.name?.[0] || user.username?.[0] || <AccountCircleIcon />}
        </Avatar>
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem disabled>{user.name || user.username}</MenuItem>
        <MenuItem onClick={() => { dispatch(logout()); setAnchorEl(null); }}>
          <LogoutIcon sx={{ mr: 1 }} /> Выйти
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserProfile;