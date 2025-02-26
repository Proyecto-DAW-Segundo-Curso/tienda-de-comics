import React, { useState, useEffect } from "react"; // Importamos React y los hooks useState y useEffect
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para la navegación entre rutas
import "./ListaChats.css"; // Importamos el archivo de estilos
import Boton from "../Boton/Boton"; // Importamos el componente personalizado Botón

const ListaChats = () => {
  // Definimos el estado para almacenar los chats
  const [chats, setChats] = useState([]);
  const [cargando, setCargando] = useState(true); // Estado para manejar la carga de los datos
  const [error, setError] = useState(""); // Estado para manejar errores en la carga
  const navigate = useNavigate(); // Hook para la navegación

  useEffect(() => {
    // Función para obtener los chats del usuario
    const obtenerChats = async () => {
      try {
        const token = localStorage.getItem("token"); // Obtenemos el token de autenticación
        const response = await fetch("http://localhost:3001/api/chat", {
          headers: { Authorization: `Bearer ${token}` }, // Enviamos el token en la cabecera
        });

        if (!response.ok) throw new Error("Error al obtener los chats"); // Si la respuesta no es correcta, lanzamos un error

        const data = await response.json(); // Convertimos la respuesta en JSON
        setChats(data); // Guardamos los chats en el estado
      } catch (error) {
        setError("No se pudieron cargar los chats."); // Mostramos un mensaje de error
      } finally {
        setCargando(false); // Quitamos el estado de carga
      }
    };

    obtenerChats(); // Llamamos a la función al montar el componente
  }, []);

  // 🔹 Función para marcar mensajes como leídos y actualizar la UI
  const manejarClickChat = async (chat_id) => {
    try {
      const token = localStorage.getItem("token"); // Obtenemos el token del almacenamiento local
      await fetch(`http://localhost:3001/api/chat/marcar-leidos/${chat_id}`, {
        method: "PUT", // Método HTTP para actualizar datos
        headers: { Authorization: `Bearer ${token}` }, // Enviamos el token en la cabecera
      });

      // 🔹 Actualizar estado local para quitar la notificación del chat
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === chat_id ? { ...chat, no_leido: false } : chat // Marcamos el chat como leído
        )
      );

      // Navegar al chat seleccionado
      navigate(`/chat/${chat_id}`);

    } catch (error) {
    }
  };

  // 🔹 Si los chats están cargando, mostramos un mensaje de carga
  if (cargando) return <p className="cargando">Cargando chats...</p>;
  // 🔹 Si hubo un error al cargar los chats, mostramos el mensaje de error
  if (error) return <p className="mensaje-error">{error}</p>;

  return (
    <div className="contenedor-lista-chats">
      <div className="card">
        
        <div className="card-header custom-header text-white fw-bold text-center">
         CHATS ACTIVOS
        </div>
        <div className="card-body custom-body">
          
          {chats.length > 0 ? (
            <div className="lista-chats">
              {chats.map((chat) => (
                <div key={chat.id} className="tarjeta-chat">
                  <p><strong>Intercambio por:</strong> {chat.comic_titulo || "Cómic"}</p>
                  <p><strong>Vendedor:</strong> {chat.vendedor_nombre || "Desconocido"}</p>
                  <p><strong>Comprador:</strong> {chat.comprador_nombre || "Desconocido"}</p>

                  
                  <div className="boton-notificacion">
                    <Boton className="btn-zu" onClick={() => manejarClickChat(chat.id)}>
                      Ir al Chat
                    </Boton>
                    {chat.no_leido && <span className="notificacion">!</span>} 
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mensaje-no-chats">No tienes chats activos.</p> 
          )}

          
          <Boton className="btn-zu btn-volver" onClick={() => navigate(-1)}>← Volver</Boton>
        </div>
      </div>
    </div>
  );
};

export default ListaChats; 