import { useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import FormRegistro from './components/FormRegistro/FormRegistro';
import FormLogin from './components/FormLogin/FormLogin';
import ZonaUsuario from './components/ZonaUsuario/ZonaUsuario';
import Intercambio from './components/Intercambio/Intercambio';
import AdminComics from './components/AdminComics/AdminComics';
import SubirComicUsuario from './components/SubirComicUsuario/SubirComicUsuario.jsx'; 
import MisComics from './components/MisComics/MisComics';
import ofertas from './data/intercambios.json';
import { CartProvider } from './CartContext/CartContext.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormComic from './components/FormComic/FormComic.jsx';
import EditarComicUsuario from './components/EditarComicUsuario/EditarComicUsuario.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import ResumenCarrito from './components/Carrito-Compra/ResumenCarrito/ResumenCarrito.jsx';
import PagManga from './components/PagManga/PagManga.jsx';
import PagComic from './components/PagComic/PagComic.jsx';
import AdminUsuarios from './components/AdminUsuarios/AdminUsuarios.jsx';



function App() {

  // `usuarioActual` almacena el estado del usuario actualmente logueado.
  // Por defecto, se inicializa como `null`, indicando que nadie ha iniciado sesión.
  // `setUsuarioActual` es la función para actualizar este estado.
  const [usuarioActual, setUsuarioActual] = useState(null);

  // `manejarLogin` es una función que se llamará cuando el usuario haya iniciado sesión con éxito.
  // Recibe un objeto `usuario` como argumento.
  const manejarLogin = (usuario) => {
    // Actualizamos el estado `usuarioActual` con los datos del usuario que acaba de loguearse.
    setUsuarioActual(usuario);

  };
  const manejarLogout = () => {
    setUsuarioActual(null);
  };

  return (

    <BrowserRouter>

      <CartProvider>  {/* Envuelve la aplicación con el CartProvider */}

        <div className="App">

          <header>
            <Header usuarioActual={usuarioActual} onLogout={manejarLogout} />
          </header>

          <main>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<FormLogin onLogin={manejarLogin} />} />
              <Route path="/registro" element={<FormRegistro />} />
              <Route path='/intercambio' element={< Intercambio ofertas={ofertas} />} />
              <Route path='/zona-usuario' element={<ZonaUsuario usuarioLogado={usuarioActual} />} />
              <Route path='/admin-comics' element={<AdminComics />} />
              <Route path="/agregar-comic" element={<FormComic />} />
              <Route path="/editar-comic/:id" element={<FormComic />} />
              <Route path="/resumen-carrito" element={<ResumenCarrito />} />
              <Route path='/pag-comic' element={<PagComic />}/>
              <Route path='/pag-manga' element={<PagManga />} />
              <Route path="/admin-usuarios" element={<AdminUsuarios />} />
              <Route path="/subir-comic-usuario" element={<SubirComicUsuario />} />
              <Route path="/mis-comics" element={<MisComics />} />
              <Route path="/editar-comic-usuario/:id" element={<EditarComicUsuario />} />


            </Routes>
          </main>

          <footer>
            <Footer />
          </footer>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
