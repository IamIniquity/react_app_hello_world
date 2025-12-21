import UserProfile from '../components/UserProfile';

const Header = () => {
  return (
    <header className="header">
      <h1>Лабораторные работы по React</h1>
      <UserProfile />
    </header>
  );
};

export default Header;