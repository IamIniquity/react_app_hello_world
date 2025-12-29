import { createSlice } from '@reduxjs/toolkit';

const loadFromStorage = () => {
  const saved = localStorage.getItem('auth');
  return saved ? JSON.parse(saved) : { 
    isLoggedIn: false, 
    user: null,
    role: null
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadFromStorage(),
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.role = action.payload.role || 'user';
      localStorage.setItem('auth', JSON.stringify(state));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.role = null;
      localStorage.removeItem('auth');
    },
    updateRole: (state, action) => {
      if (state.user) {
        state.user.role = action.payload;
        state.role = action.payload;
        localStorage.setItem('auth', JSON.stringify(state));
      }
    },
  },
});

export const { login, logout, updateRole } = authSlice.actions;
export default authSlice.reducer;