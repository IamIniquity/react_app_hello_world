import { createSlice } from '@reduxjs/toolkit';

const loadFromStorage = () => {
  const saved = localStorage.getItem('auth');
  return saved ? JSON.parse(saved) : { isLoggedIn: false, user: null };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadFromStorage(),
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem('auth', JSON.stringify(state));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem('auth');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;