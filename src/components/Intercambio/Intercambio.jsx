import React, { useState, useEffect } from 'react';
import { Rating } from '@mui/material'; // Importamos el material MUI para las estrellas
import './Intercambio.css';
import Chat from '../Chat/Chat.jsx';

const Intercambio = () => {
  const [ofertas, setOfertas] = useState([]); // Estado para almacenar las ofertas desde la API
  const [puntuaciones, setPuntuaciones] = useState({}); // Estado para la calificación de cada oferta
  const [mostrarChat, setMostrarChat] = useState(false); // Estado para mostrar/ocultar el chat
  const [vendedor, setVendedor] = useState(''); // Estado para el vendedor del chat

  // Función para obtener los cómics ofertados desde la API
  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/intercambios"); // Llamada a la API del backend
        if (!response.ok) throw new Error("Error al obtener las ofertas");

        const data = await response.json(); // Convertimos la respuesta en JSON
        setOfertas(data); // Guardamos las ofertas en el estado
      } catch (error) {
        console.error("Error al cargar ofertas:", error);
      }
    };

    fetchOfertas();
  }, []); // Se ejecuta solo al montar el componente

  // Función para abrir el chat con el vendedor de la oferta seleccionada
  const abrirChat = (vendedor) => {
    setVendedor(vendedor);
    setMostrarChat(true);
  };

  // Función para cerrar el chat
  const cerrarChat = () => {
    setMostrarChat(false);
    setVendedor('');
  };

  return (
    <div className="container mt-4">
      {mostrarChat && <Chat vendedor={vendedor} onClose={cerrarChat} />}

      {ofertas.length > 0 ? (
        <div className="row">
          {ofertas.map((oferta, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100 shadow">

                {/* Fila 1: Título */}
                <div className="card-header text-center bg-primary text-white">
                  <h5 className="m-0">{oferta.titulo}</h5>
                </div>

                {/* Fila 2: Imagen + Información */}
                <div className="card-body">
                  <div className="row">

                    {/* Columna izquierda: Imagen */}
                    <div className="col-5 d-flex align-items-center">
                      <img
                        src={oferta.imagen || "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"}
                        className="img-fluid rounded"
                        alt={oferta.titulo}
                        style={{ maxHeight: "150px", objectFit: "cover" }}
                      />
                    </div>

                    {/* Columna derecha: Información */}
                    <div className="col-7">
                      <p className="mb-1">{oferta.comentario}</p>
                      <p className="fw-bold text-primary mb-1">{oferta.precio}€</p>
                      <p className="text-muted small mb-1">Publicado: {new Date(oferta.fecha_comentario).toLocaleDateString()}</p>
                      <p className="text-warning small mb-2">
                        <strong>Estado:</strong> {oferta.estado_intercambio}
                      </p>

                      {/* Sistema de puntuación */}
                      <Rating
                        value={puntuaciones[index] || 0}
                        onChange={(event, newValue) => {
                          setPuntuaciones({ ...puntuaciones, [index]: newValue });
                        }}
                        size="small"
                      />
                    </div>

                  </div>
                </div>

                {/* Fila 3: Botón centrado */}
                <div className="card-footer d-flex justify-content-center">
                  <button className="btn btn-success w-75" onClick={() => abrirChat(oferta.vendedor)}>
                    OFERTA
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No hay ofertas disponibles.</p>
      )}
    </div>
  );
};

export default Intercambio;

