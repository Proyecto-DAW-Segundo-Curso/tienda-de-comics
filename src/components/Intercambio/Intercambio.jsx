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
        <div className="intercambio-contenedor">
            {mostrarChat && <Chat vendedor={vendedor} onClose={cerrarChat} />} {/* Renderiza el chat si está activo */}

            {ofertas.length > 0 ? (
                <div className="tarjetas-container">
                    {ofertas.map((oferta, index) => (
                        <div className="tarjeta-oferta" key={index}>
                            <img
                                src={oferta.imagen || 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'}
                                alt={oferta.titulo}
                            />
                            <div className="tarjeta-info">
                                <h3>{oferta.titulo}</h3>
                                <p>{oferta.comentario}</p>
                                <p className="precio">{oferta.precio}€</p>
                                <p className="fecha">Publicado: {new Date(oferta.fecha_comentario).toLocaleDateString()}</p>
                                <p className="estado"><strong>Estado:</strong> {oferta.estado_intercambio}</p>
                                
                                {/* Sistema de puntuación con Material-UI Rating */}
                                <div className="boton-puntuacion">
                                    <Rating
                                        value={puntuaciones[index] || 0}
                                        onChange={(event, newValue) => {
                                            setPuntuaciones({ ...puntuaciones, [index]: newValue });
                                        }}
                                    />
                                </div>

                                {/* Botón para iniciar chat con el vendedor */}
                                <div className="tarjeta-botones">
                                    <button className="boton-oferta" onClick={() => abrirChat(oferta.vendedor)}>
                                        OFERTA
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hay ofertas disponibles.</p>
            )}
        </div>
    );
};

export default Intercambio;

