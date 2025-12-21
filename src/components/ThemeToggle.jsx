import { useTheme } from '../context/ThemeContext';
import { useEffect } from 'react';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '10px 15px',
        background: isDarkMode ? '#4a5568' : '#4299e1',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        zIndex: 1000,
        fontWeight: 'bold'
      }}
    >
      {isDarkMode ? 'День' : 'Ночь'}
    </button>
  );
};

export default ThemeToggle;