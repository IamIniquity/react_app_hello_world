import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import * as apiService from '../api/apiService';
import { TextField, Button, Box } from '@mui/material';

const EditProfileForm = () => {
  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!user) return;
    const updatedUser = { ...user, name: name || user.username, email: email || user.email };
    apiService.updateUser(user.id, updatedUser)
      .then(() => alert('Профиль обновлен'))
      .catch(error => alert('Ошибка: ' + error.message));
  }, [user, name, email]);

  if (!user) return null;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
      <TextField 
        fullWidth 
        label="Имя" 
        value={name}
        onChange={(e) => setName(e.target.value)} 
        margin="normal"
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <TextField 
        fullWidth 
        label="Email" 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
        margin="normal"
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Обновить профиль
      </Button>
    </Box>
  );
};

export default EditProfileForm;