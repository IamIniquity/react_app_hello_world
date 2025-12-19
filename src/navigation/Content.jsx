import Lab2App from '../Lab2App';

const Content = ({ selectedLab }) => {
  const openFirstLab = () => {
    window.open('/first.html', '_blank');
  };

  return (
    <div className="content">
      {selectedLab === 1 && (
        <div>
          <h2>Лабораторная 1: Базовая HTML страница</h2>
          <p>Создание простой HTML страницы с CSS стилями</p>
          <button onClick={openFirstLab} className="lab-button">
            Перейти на страницу
          </button>
        </div>
      )}
      
      {selectedLab === 2 && (
        <div>
          <h2>Лабораторная 2: Hello World приложение</h2>
          <p>React приложение с компонентами Button и Container</p>
          <div className="lab2-demo">
            <Lab2App />
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;