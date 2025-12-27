import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/authSlice';
import { TextField, Button, Checkbox, FormControlLabel, Box } from '@mui/material';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      dispatch(login({ username, password, rememberMe }));
      alert('Успешная авторизация');
      navigate('/lab5');
      window.location.reload();
    } else {
      alert('Неверное имя пользователя или пароль');
    }
  }, [username, password, rememberMe, dispatch, navigate]);

  const handleClear = () => {
    setUsername('');
    setPassword('');
    setRememberMe(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
      <TextField
        fullWidth 
        label="Имя пользователя" 
        value={username}
        onChange={(e) => setUsername(e.target.value)} 
        margin="normal" 
        required
        variant="outlined"
        sx={{ 
          '& .MuiInputLabel-root': { 
            transform: 'translate(14px, -6px) scale(0.75)',
            backgroundColor: 'background.paper',
            px: 1
          }
        }}
      />
      <TextField
        fullWidth 
        label="Пароль" 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
        margin="normal" 
        required
        variant="outlined"
        sx={{ 
          '& .MuiInputLabel-root': { 
            transform: 'translate(14px, -6px) scale(0.75)',
            backgroundColor: 'background.paper',
            px: 1
          }
        }}
      />
      <FormControlLabel
        control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
        label="Запомнить меня"
      />
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button type="submit" variant="contained" fullWidth>Войти</Button>
        <Button type="button" variant="outlined" onClick={handleClear} fullWidth>Очистить</Button>
      </Box>
    </Box>
  );
};

export default LoginForm;