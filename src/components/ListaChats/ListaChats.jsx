import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ListaChats.css";
import Boton from "../Boton/Boton";

const ListaChats = () => {
  const [chats, setChats] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerChats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/api/chat", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Error al obtener los chats");

        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error("Error al obtener chats:", error);
        setError("No se pudieron cargar los chats.");
      } finally {
        setCargando(false);
      }
    };

    obtenerChats();
  }, []);

  const manejarClickChat = async (chat_id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:3001/api/chat/marcar-leidos/${chat_id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === chat_id ? { ...chat, no_leido: false } : chat
        )
      );

      navigate(`/chat/${chat_id}`);
    } catch (error) {
      console.error("Error al marcar mensajes como leídos:", error);
    }
  };

  if (cargando) return <p className="cargando">Cargando chats...</p>;
  if (error) return <p className="mensaje-error">{error}</p>;

  return (
    <div className="contenedor-lista-chats">
      <div className="card">
        {/* Cabecera */}
        <div className="card-header custom-header text-white fw-bold text-center">
          CHATS ACTIVOS
        </div>

        {/* Cuerpo de la tarjeta con los chats */}
        <div className="card-body custom-body d-flex justify-content-center align-items-center flex-column h-100">
          {/* Sección de lista de chats */}
          <div className="seccion-chats h-100">
            {chats.length > 0 ? (
              <div className="lista-chats">
                {chats.map((chat) => (
                  <div key={chat.id} className="tarjeta-chat">
                    <p><strong>Intercambio por:</strong> {chat.comic_titulo || "Cómic"}</p>
                    <p><strong>Vendedor:</strong> {chat.vendedor_nombre || "Desconocido"}</p>
                    <p><strong>Comprador:</strong> {chat.comprador_nombre || "Desconocido"}</p>
                    <div className="boton-notificacion d-flex justify-content-center align-items-center flex-column">
                      <Boton
                        onClick={() => manejarClickChat(chat.id)}
                      >
                        Ir al Chat
                      </Boton>
                      {chat.no_leido ? <span className="notificacion">!</span> : null}
                          <Boton
                            onClick={() => navigate("/zona-usuario")}
                          >
                            Volver
                          </Boton>

                    </div>
                    {/* Sección del botón volver, dentro del card-body pero separada de los chats */}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mensaje-no-chats">No tienes chats activos.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ListaChats;