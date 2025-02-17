import React, { useState, useEffect } from 'react'; 
import PortadaComic from '../PortadaComic/PortadaComic';
import './FichaLibro.css';
import { useCart } from '../../CartContext/CartContext.js'; 
import Boton from '../Boton/Boton.jsx';

function FichaLibro({ comic }) {
  const { addToCart, message, clearMessage } = useCart();  // Obtener el mensaje desde el contexto
  const { titulo, autor, editorial, genero, precio, stock, imagen } = comic;

  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    if (stock > 0) {
      addToCart(comic);
    } else {
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (message) {
      setShowModal(true);
      const timer = setTimeout(() => setShowModal(false), 1500); // Ocultar modal después de 1.5 segundos
      return () => clearTimeout(timer); // Limpiar el timer cuando el componente se desmonte
    }
  }, [message]); // Se ejecuta cuando el mensaje cambie

  return (
    <div className="ficha-libro">
      <PortadaComic src={imagen} alt={titulo} />
      <div className="info-comic">
        <h3>{titulo}</h3>
        <p><strong>Autor:</strong> {autor}</p>
        <p><strong>Editorial:</strong> {editorial}</p>
        <p><strong>Género:</strong> {genero}</p>
        <p><strong>Precio:</strong> ${precio.toFixed(2)}</p>
        <p><strong>Stock:</strong> {stock}</p>
      </div>
      <Boton onClick={handleAddToCart}>+ Añadir</Boton>

      {showModal && message && (
        <div className="modal-stock">
          <p>{message}</p> {/* Mostrar el mensaje del contexto */}
        </div>
      )}
    </div>
  );
}

export default FichaLibro;
