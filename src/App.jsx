import './App.css';
import Container from './components/Container';
import Button from './components/Button';

function App() {
  return (
    <div className="app">
      <h1>Hello World!</h1>
      
      <Container>
        <h2>Навигация</h2>
        <div className="button-group">
          <Button>Главная</Button>
          <Button>О Нас</Button>
          <Button>Контакты</Button>
        </div>
      </Container>
    </div>
  );
}

export default App;