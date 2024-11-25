import { useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import FormLogin from './components/FormLogin/FormLogin';

function App() {

  const [componenteMostrado, setComponenteMostrado] = useState('home')

  const manejarNavegacion = (componete) => {

    setComponenteMostrado(componete)
  }

  return (
    <div className="App">
      <header>
        <Header navegarHacia={manejarNavegacion} />
      </header>
      <main>
        {componenteMostrado === "home" && <Home />}
        {componenteMostrado === "login" && <FormLogin />}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>

  );
}

export default App;
