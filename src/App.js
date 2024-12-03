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

function App() {

  const [componenteMostrado, setComponenteMostrado] = useState('home')

  const manejarNavegacion = (componete) => {

    setComponenteMostrado(componete)
  }

  // `usuarioActual` almacena el estado del usuario actualmente logueado.
  // Por defecto, se inicializa como `null`, indicando que nadie ha iniciado sesión.
  // `setUsuarioActual` es la función para actualizar este estado.
  const [usuarioActual, setUsuarioActual] = useState(null);

  // `manejarLogin` es una función que se llamará cuando el usuario haya iniciado sesión con éxito.
  // Recibe un objeto `usuario` como argumento.
  const manejarLogin = (usuario) => {
    // Actualizamos el estado `usuarioActual` con los datos del usuario que acaba de loguearse.
    setUsuarioActual(usuario);
    setComponenteMostrado("zona-usuario");
  };

  return (
    <div className="App">
      <header>
        <Header navegarHacia={manejarNavegacion} />
      </header>
      <main>

        {componenteMostrado === "home" && <Home />}

        {componenteMostrado === "login" && <FormLogin onLogin={manejarLogin}/>}

        {componenteMostrado === "zona-usuario" && <ZonaUsuario usuarioLogado={usuarioActual}/>}

        {componenteMostrado === "intercambio" && <Intercambio ofertas={ofertas} />}

      </main>
      <footer>
        <Footer />
      </footer>
    </div>

  );
}

export default App;
