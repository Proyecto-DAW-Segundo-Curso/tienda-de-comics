import React, { useState, useEffect } from 'react';
import { Rating } from '@mui/material'; // Importamos el material MUI para las estrellas
import './Intercambio.css';
import { useNavigate } from 'react-router-dom';
import Boton from '../Boton/Boton.jsx';

const Intercambio = () => { // Define el componente Intercambio como una función
  const [ofertas, setOfertas] = useState([]); // Estado para almacenar las ofertas desde la API
  const [puntuaciones, setPuntuaciones] = useState({}); // Estado para la calificación de cada oferta
  const [usuario, setUsuario] = useState(null); // Estado para verificar el usuario logueado
  const [mensajeError, setMensajeError] = useState(''); // Mensaje de error si aplica
  const navigate = useNavigate(); // Obtiene la función navigate para la navegación programática

  // Obtener las ofertas desde la API
  useEffect(() => {
    const fetchOfertas = async () => { // Define una función asíncrona para obtener las ofertas
      try {
        const response = await fetch("http://localhost:3001/api/intercambios"); // Hace una solicitud GET a la API
        if (!response.ok) throw new Error("Error al obtener las ofertas"); // Lanza un error si la respuesta no es exitosa

        const data = await response.json(); // Convierte la respuesta a JSON

        // Agregamos un console.log para verificar si las ofertas incluyen usuario_id
        console.log("📌 Datos recibidos de la API:", data);

        setOfertas(data); // Actualiza el estado ofertas con los datos obtenidos
      } catch (error) {
        console.error("Error al cargar ofertas:", error); // Muestra el error en la consola
      }
    };

    fetchOfertas(); // Llama a la función para obtener las ofertas
  }, []); // Dependencias: ejecuta el hook solo al montar el componente

  // Verificar si el usuario está logueado
  useEffect(() => {
    const token = localStorage.getItem("token"); // Obtiene el token de autenticación del localStorage

    if (!token) {
      setMensajeError("Debes iniciar sesión para hacer una oferta."); // Muestra un mensaje de error si no hay token
      return;
    }

    const obtenerUsuario = async () => { // Define una función asíncrona para obtener el usuario
      try {
        const response = await fetch("http://localhost:3001/api/usuario", {
          headers: { Authorization: `Bearer ${token}` } // Incluye el token en los headers de la solicitud
        });

        if (!response.ok) throw new Error("No se pudo obtener la información del usuario"); // Lanza un error si la respuesta no es exitosa

        const data = await response.json(); // Convierte la respuesta a JSON
        setUsuario(data); // Actualiza el estado usuario con los datos obtenidos
      } catch (error) {
        console.error("Error al obtener usuario:", error); // Muestra el error en la consola
        setMensajeError("Hubo un problema al verificar tu cuenta."); // Muestra un mensaje de error
      }
    };

    obtenerUsuario(); // Llama a la función para obtener el usuario
  }, []); // Dependencias: ejecuta el hook solo al montar el componente

  // Función para manejar la oferta
  const manejarOferta = async (oferta) => {
    console.log(" Oferta seleccionada:", oferta); // Ver qué datos tiene la oferta

    if (!usuario) {
      setMensajeError("Debes iniciar sesión para hacer una oferta."); // Muestra un mensaje de error si el usuario no está logueado
      return;
    }

    // Intentamos extraer el vendedor desde la oferta
    const vendedorId = oferta.vendedor_id || oferta.usuario_id; // Obtiene el ID del vendedor

    if (!vendedorId) {
      console.error(" No se encontró vendedor_id en la oferta:", oferta); // Muestra un error si no se encuentra el ID del vendedor
      setMensajeError("Error: No se pudo identificar al vendedor."); // Muestra un mensaje de error
      return;
    }

    if (usuario.id === vendedorId) {
      setMensajeError("No puedes hacer una oferta por tu propio cómic."); // Muestra un mensaje de error si el usuario intenta ofertar por su propio cómic
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Obtiene el token de autenticación del localStorage

      const bodyData = {
        vendedor_id: vendedorId, // Asigna el ID del vendedor
        comprador_id: usuario.id, // Asigna el ID del comprador
        comic_id: oferta.comic_id || oferta.id // Asigna el ID del cómic
      };

      console.log(" Datos enviados al backend:", bodyData); // Muestra los datos enviados al backend

      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` // Incluye el token en los headers de la solicitud
        },
        body: JSON.stringify(bodyData) // Convierte los datos a JSON
      });

      const data = await response.json(); // Convierte la respuesta a JSON

      if (!response.ok) {
        console.error(" Error en la respuesta del servidor:", data); // Muestra un error si la respuesta no es exitosa
        throw new Error(data.message || "Error al iniciar el chat."); // Lanza un error con el mensaje del servidor
      }

      if (!data.chat_id) {
        throw new Error("El ID del chat no se recibió correctamente."); // Lanza un error si no se recibe el ID del chat
      }

      navigate(`/chat/${data.chat_id}`); // Navega a la página del chat con el ID del chat
    } catch (error) {
      console.error(" Error al iniciar chat:", error); // Muestra el error en la consola
      setMensajeError("Hubo un problema al iniciar el chat."); // Muestra un mensaje de error
    }
  };
  return (
    <div className="container mt-4">
      {mensajeError && <div className="mensaje-error">{mensajeError}</div>} {/* Muestra el mensaje de error si existe */}      {ofertas.length > 0 ? (
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
                      <p className="vendedor"><strong>Vendedor:</strong> {oferta.vendedor_nombre || "Desconocido"}</p> {/* Nombre del vendedor */}                      {/* Sistema de puntuación */}
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
                <div className="d-flex justify-content-center">

                  <Boton className="w-75 mb-3" onClick={() => manejarOferta(oferta)}>
                    OFERTA
                  </Boton>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="alert alert-warning mt-3">No hay ofertas disponibles.</p>
      )}
    </div>
  );
};

export default Intercambio;

