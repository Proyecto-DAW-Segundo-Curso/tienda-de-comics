import React, { useState, useEffect } from 'react';
import PortadaComic from '../PortadaComic/PortadaComic';
import { useCart } from '../../CartContext/CartContext.js';
import Boton from '../Boton/Boton.jsx';
import './FichaLibro.css';

function FichaLibro({ comic }) {
  const { addToCart, message, setMessage } = useCart();
  const { titulo, autor, editorial, genero, precio, stock, imagen } = comic;

  const [showModal, setShowModal] = useState(false);
  

  const handleAddToCart = () => {
    if (stock > 0) {
      setMessage(`${titulo} añadido al carrito`);
      addToCart(comic);
    } else {
      setMessage("No hay suficiente stock");
    }
  };

  useEffect(() => {
    if (message) {
      setShowModal(true);
      const timer = setTimeout(() => {
        setShowModal(false);
        setMessage("")  
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="card custom-card d-flex flex-column justify-content-between align-items-center p-2">
      {/* Contenedor de la imagen */}
      <div className="card-image">
        <PortadaComic src={imagen} alt={titulo} className="img-fluid" />
      </div>

      {/* Contenedor del contenido con scroll */}
      <div className="text-center list-group custom-card-content border-0 d-flex align-items-center justify-content-center">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text"><strong>Autor:</strong> {autor}</p>
        <p className="card-text"><strong>Editorial:</strong> {editorial}</p>
        <p className="card-text"><strong>Género:</strong> {genero}</p>
        <p className="card-text"><strong>Precio:</strong> ${precio.toFixed(2)}</p>
        <p className={`card-text ${stock > 0 ? 'text-success' : 'text-danger'}`}>
          <strong>Stock:</strong> {stock}
        </p>
      </div>

      {/* Contenedor del botón */}
      <div>
        <Boton className="w-75" onClick={handleAddToCart}>+ Añadir</Boton>
      </div>

      {showModal && message && (
        <div className="modal fade show d-block" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body text-center">
                <p>{message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FichaLibro;
