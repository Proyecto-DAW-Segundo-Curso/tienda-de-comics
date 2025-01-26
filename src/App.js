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
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  // const [componenteMostrado, setComponenteMostrado] = useState('home');

  // const manejarNavegacion = (componente) => {
  //   setComponenteMostrado(componente);
  // };

  const manejarNavegacion = (ruta) => {
    // Implementa lógica de navegación si es necesario
    console.log(`Navegando hacia ${ruta}`);
  };

  // // `usuarioActual` almacena el estado del usuario actualmente logueado.
  // // Por defecto, se inicializa como `null`, indicando que nadie ha iniciado sesión.
  // // `setUsuarioActual` es la función para actualizar este estado.
  // const [usuarioActual, setUsuarioActual] = useState(null);

  // // `manejarLogin` es una función que se llamará cuando el usuario haya iniciado sesión con éxito.
  // // Recibe un objeto `usuario` como argumento.
  // const manejarLogin = (usuario) => {
  //   // Actualizamos el estado `usuarioActual` con los datos del usuario que acaba de loguearse.
  //   setUsuarioActual(usuario);
  //   setComponenteMostrado("zona-usuario");
  // };

  return (

    <BrowserRouter>

      <CartProvider>  {/* Envuelve la aplicación con el CartProvider */}
        {/* <div className="App">
        <header>
          <Header navegarHacia={manejarNavegacion} />
        </header>
        <main>
          {componenteMostrado === "home" && <Home />}
          {componenteMostrado === "login" && <FormLogin onLogin={manejarLogin} />}
          {componenteMostrado === "registro" && <FormRegistro />}
          {componenteMostrado === "zona-usuario" && <ZonaUsuario usuarioLogado={usuarioActual} />}
          {componenteMostrado === "intercambio" && <Intercambio ofertas={ofertas} />}
        </main>
        <footer>
          <Footer />
        </footer> 

      </div> */}

        <header>
          <Header navegarHacia={manejarNavegacion} />
        </header>
        
        <main>
        <Routes>

          <Route exact path="/" element={<Home />} />
          <Route path="/header" element={<Header />} />
          <Route path="/login" element={<FormLogin />} />
          <Route path="/registro" element={<FormRegistro />} />
          <Route path='/intercambio' element={< Intercambio ofertas={ofertas}/>} />
          {/* <Route path='zona-usuario' element={<ZonaUsuario usuarioLogado={usuarioActual} />}/> */}
        </Routes>
        </main>

        <footer>
          <Footer />
        </footer>

      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
