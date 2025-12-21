import { useSelector } from 'react-redux';

const useLoginState = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn;
};

export default useLoginState;