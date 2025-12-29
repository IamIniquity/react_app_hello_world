import { useSelector } from 'react-redux';

const useRole = () => {
  const role = useSelector((state) => state.auth.role);
  const isAdmin = role === 'admin';
  const isUser = role === 'user';
  
  return {
    role,
    isAdmin,
    isUser,
    hasRole: (requiredRole) => role === requiredRole,
  };
};

export default useRole;