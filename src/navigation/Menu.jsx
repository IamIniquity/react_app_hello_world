const Menu = ({ onSelect }) => {
  return (
    <div className="menu">
      <h3>Список лабораторных работ</h3>
      <button onClick={() => onSelect(1)}>Лабораторная 1</button>
      <button onClick={() => onSelect(2)}>Лабораторная 2</button>
    </div>
  );
};

export default Menu;