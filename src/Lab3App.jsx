import { useState } from 'react';
import Header from './navigation/Header';
import Footer from './navigation/Footer';
import Menu from './navigation/Menu';
import Content from './navigation/Content';
import './Lab3App.css';

const Lab3App = () => {
  const [selectedLab, setSelectedLab] = useState(null);
  
  return (
    <div className="lab3-app">
      <Header />
      
      <div className="main-layout">
        <Menu onSelect={setSelectedLab} />
        <Content selectedLab={selectedLab} />
      </div>
      
      <Footer />
    </div>
  );
};

export default Lab3App;