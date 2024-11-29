import { useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import FormLogin from './components/FormLogin/FormLogin';
import Intercambio from './components/Intercambio/Intercambio';


function App() {

  const [componenteMostrado, setComponenteMostrado] = useState('home')

  const manejarNavegacion = (componete) => {

    setComponenteMostrado(componete)
  }

  // Simulamos datos de ofertas
  const ofertas = [
    {
      titulo: 'Spiderman',
      descripcion: 'Primera edición en buen estado',
      precio: 50,
      vendedor: 'Juan',
      imagen: 'Spiderman_Marvel.png',  // URL de la imagen
    },
    {
      titulo: 'Weekly Shonen Jump Nº 6',
      descripcion: 'Nuevo con portada exclusiva',
      precio: 20,
      vendedor: 'Ana',
      imagen: 'WeeklyShonenJumpNo6',  // URL de la imagen
    },
  ];
  

  return (
    <div className="App">
      <header>
        <Header navegarHacia={manejarNavegacion} />
      </header>
      <main>
        {componenteMostrado === "home" && <Home />}
        
        {componenteMostrado === "login" && <FormLogin />}

        {componenteMostrado === "intercambio" && <Intercambio ofertas={ofertas} />}
        
        
      </main>
      <footer>
        <Footer />
      </footer>
    </div>

  );
}

export default App;
