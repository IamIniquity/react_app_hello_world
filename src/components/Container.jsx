import './Container.css'; // Добавить эту строку

const Container = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default Container;