import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    alert('Вы вышли из системы');
  };

  if (!isLoggedIn || !user) return null;

  return (
    <div className="user-profile">
      <span>{user.name || user.username}</span>
      <button onClick={handleLogout} className="logout-btn">
        Выйти
      </button>
    </div>
  );
};

export default UserProfile;