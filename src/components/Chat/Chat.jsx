import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Chat.css';

const Chat = () => {
    const { id } = useParams(); // ID del chat obtenido de la URL
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [otroUsuario, setOtroUsuario] = useState(''); // Estado para guardar el nombre del otro usuario
    const [mensaje, setMensaje] = useState('');
    const [conversacion, setConversacion] = useState([]);
    const [errorMensaje, setErrorMensaje] = useState('');
    const [estadoIntercambio, setEstadoIntercambio] = useState(''); // Mensajes del botón aceptar

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setErrorMensaje("Debes iniciar sesión para ver este chat.");
            return;
        }

        const obtenerUsuario = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/usuario", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!response.ok) throw new Error("No se pudo obtener la información del usuario");

                const data = await response.json();
                setUsuario(data);
            } catch (error) {
                console.error("Error al obtener usuario:", error);
                setErrorMensaje("Hubo un problema al verificar tu cuenta.");
            }
        };

        obtenerUsuario();
    }, []);

    useEffect(() => {
        if (!errorMensaje) {
            const obtenerMensajes = async () => {
                try {
                    const token = localStorage.getItem("token");
    
                    if (!token) throw new Error("Usuario no autenticado");
    
                    const response = await fetch(`http://localhost:3001/api/chat/mensajes/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
    
                    if (!response.ok) throw new Error("Error al obtener mensajes");
    
                    const data = await response.json();
                    
    
                    setConversacion(data); // Guardamos los mensajes en el estado
                } catch (error) {
                    console.error("Error al obtener mensajes:", error);
                    setErrorMensaje("No tienes permiso para ver este chat.");
                }
            };
    
            obtenerMensajes();
        }
    }, [id, errorMensaje]);

    // Obtener datos del otro usuario en el chat
    useEffect(() => {
        const obtenerDetallesChat = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Usuario no autenticado");
    
                const response = await fetch(`http://localhost:3001/api/chat/detalles/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
    
                if (!response.ok) throw new Error("Error al obtener datos del chat");
    
                const data = await response.json();
    
                // Determinar si el usuario autenticado es el comprador o el vendedor
                if (usuario) {
                    if (usuario.id === data.comprador_id) {
                        setOtroUsuario(data.vendedor_nombre); // Si soy comprador, muestro el vendedor
                    } else {
                        setOtroUsuario(data.comprador_nombre); // Si soy vendedor, muestro el comprador
                    }
                }
            } catch (error) {
                console.error("Error al obtener detalles del chat:", error);
                setOtroUsuario("Usuario desconocido");
            }
        };
    
        if (usuario) {
            obtenerDetallesChat();
        }
    }, [id, usuario]);
    

    const enviarMensaje = async () => {
        if (mensaje.trim() === '') return;
    
        try {
            const token = localStorage.getItem("token");
    
            const response = await fetch("http://localhost:3001/api/chat/mensaje", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ chat_id: id, mensaje }),
            });
    
            if (!response.ok) throw new Error("Error al enviar mensaje");
    
            // Crear el nuevo mensaje con la misma estructura que devuelve el backend
            const nuevoMensaje = {
                usuario_id: usuario.id, // Se guarda el ID del usuario actual
                mensaje: mensaje, // El texto del mensaje
                enviado_en: new Date().toISOString() // Se genera la fecha de envío
            };
    
            // Actualizar el estado con el nuevo mensaje
            setConversacion((prevConversacion) => [...prevConversacion, nuevoMensaje]);
    
            // Limpiar el input
            setMensaje('');
        } catch (error) {
            console.error("Error al enviar mensaje:", error);
        }
    };
    

    const aceptarIntercambio = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/chat/aceptar", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}` 
                },
                body: JSON.stringify({ chat_id: id }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Error al aceptar el intercambio");

            if (data.finalizado) {
                setEstadoIntercambio(" Intercambio completado. El cómic ha sido transferido.");
                setTimeout(() => navigate("/chats-activos"), 3000); // Redirigir tras 3 segundos
            } else {
                setEstadoIntercambio(" Has aceptado el intercambio. Esperando la confirmación del otro usuario.");
            }
        } catch (error) {
            console.error("Error al aceptar intercambio:", error);
            setEstadoIntercambio(" Hubo un problema al aceptar el intercambio.");
        }
    };

    const rechazarIntercambio = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/chat/rechazar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ chat_id: id }),
            });

            if (!response.ok) throw new Error("Error al rechazar el chat");

            setEstadoIntercambio(" Has rechazado el chat. Será eliminado.");
            setTimeout(() => navigate("/chats-activos"), 3000);
        } catch (error) {
            console.error("Error al rechazar el chat:", error);
            setEstadoIntercambio(" Hubo un problema al eliminar el chat.");
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Chat con {otroUsuario || "Usuario"}</h2>
                <button className="btn-volver" onClick={() => navigate(-1)}>← Volver</button>
            </div>

            {errorMensaje ? (
                <div className="chat-error">
                    <p>{errorMensaje}</p>
                    <button onClick={() => navigate("/login")} className="btn-login">Iniciar Sesión</button>
                </div>
            ) : (
                <>
                    <div className="chat-messages">
                        {conversacion.length > 0 ? (
                            conversacion.map((msg, index) => (
                                <div key={index} className={`mensaje ${msg.usuario_id === usuario?.id ? 'vendedor' : 'comprador'}`}>
                                    <span>{msg.mensaje}</span> {/* 🔹 Asegurar que mostramos el mensaje */}
                                </div>
                            ))
                        ) : (
                            <p className="mensaje-estado">No hay mensajes en este chat.</p>
                        )}
                    </div>


                    {estadoIntercambio && (
                        <div className="mensaje-estado">
                            <p>{estadoIntercambio}</p>
                        </div>
                    )}

                    <div className="chat-input">
                        <input
                            type="text"
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                            placeholder="Escribe tu mensaje..."
                        />
                        <button onClick={enviarMensaje}>Enviar</button>
                    </div>
                    <div className="chat-acciones">
                        <button onClick={aceptarIntercambio} className="boton-aceptar">Aceptar</button>
                        <button onClick={rechazarIntercambio} className="boton-rechazar">Rechazar</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Chat;
