import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="menu">
      <h3>Лабораторные работы</h3>
      <ul>
        <li><Link to="/">Главная</Link></li>
        <li><Link to="/lab1">Лабораторная 1</Link></li>
        <li><Link to="/lab2">Лабораторная 2</Link></li>
        <li><Link to="/counter-demo">useState/useEffect</Link></li>
        <li><Link to="/redux-demo">Redux</Link></li>
        <li><Link to="/lab5">Лабораторная 5</Link></li>
        <li><Link to="/lab6">Лабораторная 6</Link></li>
      </ul>
    </div>
  );
};

export default Menu;