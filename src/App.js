import { useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import FormRegistro from './components/FormRegistro/FormRegistro';
import FormLogin from './components/FormLogin/FormLogin';
import ZonaUsuario from './components/ZonaUsuario/ZonaUsuario';
import Intercambio from './components/Intercambio/Intercambio';
import ofertas from './data/intercambios.json';
import { CartProvider } from './CartContext/CartContext.js';  

function App() {

  const [componenteMostrado, setComponenteMostrado] = useState('home');

  const manejarNavegacion = (componente) => {
    setComponenteMostrado(componente);
  };

  return (
    <CartProvider>  {/* Envuelve la aplicación con el CartProvider */}
      <div className="App">
        <header>
          <Header navegarHacia={manejarNavegacion} />
        </header>
        <main>
          {componenteMostrado === "home" && <Home />}
          {componenteMostrado === "login" && <FormLogin />}
          {componenteMostrado === "zona-usuario" && <ZonaUsuario />}
          {componenteMostrado === "intercambio" && <Intercambio ofertas={ofertas} />}
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;
