import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';

const LabDrawer = ({ open, onClose }) => {
  const { role } = useSelector((state) => state.auth); //получение роли
  
  const items = [
    'Главная (Обзор): /',
    'Лаба 1: /lab1',
    'Лаба 2: /lab2',
    'Лаба 4: /lab4',
    'Лаба 5: /lab5',
    'Лаба 6: /lab6',
    'О себе: /about',
  ];

  // админка
  if (role === 'admin') {
    items.push('Админ-панель: /admin');
  }

  const quickActions = [
    'useState/useEffect: /counter-demo',
    'Redux: /redux-demo',
    'Обратная связь: /lab5',
    'REST API: /lab6',
  ];

  return (
    <Drawer 
      anchor="left" 
      open={open} 
      onClose={onClose}
      key={role}
    >
      <List sx={{ width: 250 }}>
        <ListItem><b>Лабораторные</b></ListItem>
        <Divider />
        
        {items.map((item) => {
          const [text, to] = item.split(': ');
          return (
            <ListItem 
              button 
              key={text}
              component={Link} 
              to={to}
              onClick={onClose}
            >
              <ListItemText primary={text} />
            </ListItem>
          );
        })}

        <Divider />
        <ListItem><b>Быстрые действия</b></ListItem>
        {quickActions.map((item) => {
          const [text, to] = item.split(': ');
          return (
            <ListItem 
              button 
              key={text}
              component={Link} 
              to={to}
              onClick={onClose}
            >
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default LabDrawer;