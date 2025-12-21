import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context/ThemeContext';
import { store } from './redux/store';
import Lab4App from './Lab4App';
import Lab5App from './Lab5App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider>
          <Lab4App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);