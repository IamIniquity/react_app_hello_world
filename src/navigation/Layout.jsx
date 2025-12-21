import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import Content from './Content';
import ThemeToggle from '../components/ThemeToggle';

const Layout = () => {
  return (
    <div className="lab3-app">
      <ThemeToggle />
      <Header />
      
      <div className="main-layout">
        <Menu />
        <Content />
      </div>
      
      <Footer />
    </div>
  );
};

export default Layout;