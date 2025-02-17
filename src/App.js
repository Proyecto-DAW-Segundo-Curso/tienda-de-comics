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
import FormularioIntercambio from './components/FormularioIntercambio/FormularioIntercambio.jsx'; 
import { CartProvider } from './CartContext/CartContext.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormComic from './components/FormComic/FormComic.jsx';
import EditarComicUsuario from './components/EditarComicUsuario/EditarComicUsuario.jsx';
import MisOfertas from "./components/MisOfertas/MisOfertas.jsx"; 
import EditarOferta from "./components/EditarOferta/EditarOferta.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [usuarioActual, setUsuarioActual] = useState(null);

  const manejarLogin = (usuario) => {
    setUsuarioActual(usuario);
  };

  const manejarLogout = () => {
    setUsuarioActual(null);
  };

  return (
    <BrowserRouter>
      <CartProvider>
        <div className="App">
          <header>
            <Header usuarioActual={usuarioActual} onLogout={manejarLogout} />
          </header> 

          <main>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<FormLogin onLogin={manejarLogin} />} />
              <Route path="/registro" element={<FormRegistro />} />
              <Route path='/intercambio' element={<Intercambio />} />
              <Route path='/zona-usuario' element={<ZonaUsuario usuarioLogado={usuarioActual} />} />
              <Route path='/admin-comics' element={<AdminComics />} />
              <Route path="/agregar-comic" element={<FormComic />} />
              <Route path="/editar-comic/:id" element={<FormComic />} />
              <Route path="/subir-comic-usuario" element={<SubirComicUsuario />} />
              <Route path="/mis-comics" element={<MisComics />} />
              <Route path="/editar-comic-usuario/:id" element={<EditarComicUsuario />} />
              <Route path="/ofertar-comic/:id" element={<FormularioIntercambio />} />
              <Route path="/mis-ofertas" element={<MisOfertas />} />
              <Route path="/editar-oferta/:id" element={<EditarOferta />} />
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
