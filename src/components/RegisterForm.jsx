import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/authSlice';
import { TextField, Button, Box } from '@mui/material';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }
    if (password.length < 6) {
      alert('Пароль должен быть не менее 6 символов');
      return;
    }
    dispatch(login({ username: email, name: name || email.split('@')[0] }));
    alert('Регистрация успешна!');
    navigate('/lab5');
  }, [email, name, password, confirmPassword, dispatch, navigate]);

  const handleClear = () => {
    setEmail('');
    setName('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
      <TextField 
        fullWidth 
        label="Email" 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
        margin="normal" 
        required
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <TextField 
        fullWidth 
        label="Имя (необязательно)" 
        value={name}
        onChange={(e) => setName(e.target.value)} 
        margin="normal"
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <TextField 
        fullWidth 
        label="Пароль" 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
        margin="normal" 
        required
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <TextField 
        fullWidth 
        label="Подтвердите пароль" 
        type="password" 
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)} 
        margin="normal" 
        required
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button type="submit" variant="contained" fullWidth>Зарегистрироваться</Button>
        <Button type="button" variant="outlined" onClick={handleClear} fullWidth>Очистить</Button>
      </Box>
    </Box>
  );
};

export default RegisterForm;