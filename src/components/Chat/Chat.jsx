import React, { useState, useEffect } from 'react'; // Importamos React y los hooks useState y useEffect
import { useParams, useNavigate } from 'react-router-dom'; // useParams para obtener el ID del chat de la URL, useNavigate para redireccionar
import './Chat.css';

const Chat = () => {
    const { id } = useParams();  // Extraemos el ID del chat desde la URL
    const navigate = useNavigate(); // Hook para la navegación entre páginas
    const [usuario, setUsuario] = useState(null); // Estado para almacenar la información del usuario autenticado
    const [otroUsuario, setOtroUsuario] = useState(''); // Estado para guardar el nombre del otro usuario en el chat
    const [mensaje, setMensaje] = useState(''); // Estado para el mensaje que se enviará
    const [conversacion, setConversacion] = useState([]); // Estado para almacenar los mensajes del chat
    const [errorMensaje, setErrorMensaje] = useState(''); // Estado para manejar errores
    const [estadoIntercambio, setEstadoIntercambio] = useState(''); // Estado para mensajes relacionados con la aceptación del intercambio

    useEffect(() => {
        // Obtenemos el token almacenado en el localStorage del navegador
        const token = localStorage.getItem("token"); 
    
        // Si no hay token, significa que el usuario no ha iniciado sesión
        if (!token) { 
            setErrorMensaje("Debes iniciar sesión para ver este chat."); // Mostramos un mensaje de error
            return; // Detenemos la ejecución del efecto
        }
    
        // Definimos una función asíncrona para obtener la información del usuario autenticado
        const obtenerUsuario = async () => {
            try {
                // Hacemos una solicitud GET al endpoint de usuario en el servidor
                const response = await fetch("http://localhost:3001/api/usuario", {
                    headers: { Authorization: `Bearer ${token}` } // Enviamos el token en la cabecera para autenticación
                });
    
                // Si la respuesta no es exitosa, lanzamos un error
                if (!response.ok) throw new Error("No se pudo obtener la información del usuario");
    
                // Convertimos la respuesta a JSON y guardamos los datos en el estado
                const data = await response.json();
                setUsuario(data); 
    
            } catch (error) {
                // Si ocurre un error en la solicitud, lo mostramos en la consola y establecemos un mensaje de error
                console.error("Error al obtener usuario:", error);
                setErrorMensaje("Hubo un problema al verificar tu cuenta.");
            }
        };
    
        // Llamamos a la función para obtener la información del usuario
        obtenerUsuario();
    
    // El array de dependencias está vacío ([]), lo que significa que este efecto se ejecutará solo una vez cuando el componente se monte
    }, []);
    

    useEffect(() => {
        // Verificamos si hay un mensaje de error antes de ejecutar la función
        if (!errorMensaje) { 
    
            // Definimos una función asíncrona para obtener los mensajes del chat
            const obtenerMensajes = async () => {
                try {
                    // Obtenemos el token de autenticación desde localStorage
                    const token = localStorage.getItem("token");
    
                    // Si no hay token, significa que el usuario no está autenticado, por lo que lanzamos un error
                    if (!token) throw new Error("Usuario no autenticado");
    
                    // Hacemos una solicitud GET para obtener los mensajes del chat específico (según el ID del chat)
                    const response = await fetch(`http://localhost:3001/api/chat/mensajes/${id}`, {
                        headers: { Authorization: `Bearer ${token}` } // Enviamos el token en la cabecera para autenticación
                    });
    
                    // Si la respuesta no es exitosa, lanzamos un error
                    if (!response.ok) throw new Error("Error al obtener mensajes");
    
                    // Convertimos la respuesta en JSON y guardamos los mensajes en el estado
                    const data = await response.json();
                    setConversacion(data); 
    
                } catch (error) {
                    // Si ocurre un error en la solicitud, lo mostramos en la consola y establecemos un mensaje de error
                    console.error("Error al obtener mensajes:", error);
                    setErrorMensaje("No tienes permiso para ver este chat.");
                }
            };
    
            // Llamamos a la función para obtener los mensajes del chat
            obtenerMensajes();
        }
    
    // El efecto se ejecuta cuando cambian `id` o `errorMensaje`
    }, [id, errorMensaje]);
    

    // Obtener datos del otro usuario en el chat
    useEffect(() => {
        const obtenerDetallesChat = async () => {
            try {
                // Obtenemos el token de autenticación desde localStorage
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Usuario no autenticado");
    
                // Hacemos una solicitud GET para obtener los detalles del chat según el ID
                const response = await fetch(`http://localhost:3001/api/chat/detalles/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
    
                // Si la respuesta no es exitosa, lanzamos un error
                if (!response.ok) throw new Error("Error al obtener datos del chat");
    
                // Convertimos la respuesta en JSON
                const data = await response.json();
    
                // Determinamos si el usuario autenticado es el comprador o el vendedor
                if (usuario) {
                    if (usuario.id === data.comprador_id) {
                        setOtroUsuario(data.vendedor_nombre); // Si el usuario es el comprador, se muestra el nombre del vendedor
                    } else {
                        setOtroUsuario(data.comprador_nombre); // Si el usuario es el vendedor, se muestra el nombre del comprador
                    }
                }
            } catch (error) {
                console.error("Error al obtener detalles del chat:", error);
                setOtroUsuario("Usuario desconocido"); // En caso de error, establecemos un nombre genérico
            }
        };
    
        // Ejecutamos la función solo si hay información del usuario disponible
        if (usuario) {
            obtenerDetallesChat();
        }
    
    // Se ejecuta cuando cambian `id` o `usuario`
    }, [id, usuario]);
    
    

    const enviarMensaje = async () => {
        // Verificamos que el mensaje no esté vacío antes de enviarlo
        if (mensaje.trim() === '') return;
    
        try {
            // Obtenemos el token de autenticación desde localStorage
            const token = localStorage.getItem("token");
    
            // Realizamos una solicitud POST al backend para enviar el mensaje
            const response = await fetch("http://localhost:3001/api/chat/mensaje", {
                method: "POST", // Método HTTP para enviar datos
                headers: {
                    "Content-Type": "application/json", // Indicamos que enviamos datos en formato JSON
                    Authorization: `Bearer ${token}`, // Incluimos el token para autenticación
                },
                body: JSON.stringify({ chat_id: id, mensaje }), // Enviamos el ID del chat y el mensaje en el cuerpo de la solicitud
            });
    
            // Si la respuesta no es exitosa, lanzamos un error
            if (!response.ok) throw new Error("Error al enviar mensaje");
    
            // Creamos un objeto con la misma estructura de mensaje que devuelve el backend
            const nuevoMensaje = {
                usuario_id: usuario.id, // Se guarda el ID del usuario actual
                mensaje: mensaje, // El texto del mensaje enviado
                enviado_en: new Date().toISOString() // Se genera la fecha y hora actual en formato ISO
            };
    
            // Actualizamos el estado de la conversación agregando el nuevo mensaje al historial
            setConversacion((prevConversacion) => [...prevConversacion, nuevoMensaje]);
    
            // Limpiamos el campo de entrada del mensaje después de enviarlo
            setMensaje('');
        } catch (error) {
            // Si ocurre un error, lo mostramos en la consola
            console.error("Error al enviar mensaje:", error);
        }
    };
    
    

    const aceptarIntercambio = async () => {
        try {
            // Realizamos una solicitud POST al backend para aceptar el intercambio
            const response = await fetch("http://localhost:3001/api/chat/aceptar", {
                method: "POST", // Método HTTP para enviar datos
                headers: { 
                    "Content-Type": "application/json", // Indicamos que enviamos datos en formato JSON
                    Authorization: `Bearer ${localStorage.getItem("token")}` // Obtenemos el token de autenticación desde localStorage
                },
                body: JSON.stringify({ chat_id: id }), // Enviamos el ID del chat en el cuerpo de la solicitud
            });
    
            // Convertimos la respuesta en JSON
            const data = await response.json();
    
            // Si la respuesta no es exitosa, lanzamos un error con el mensaje recibido o uno genérico
            if (!response.ok) throw new Error(data.message || "Error al aceptar el intercambio");
    
            // Verificamos si el intercambio ha sido finalizado
            if (data.finalizado) {
                setEstadoIntercambio("Intercambio completado. El cómic ha sido transferido."); // Mensaje de confirmación
                setTimeout(() => navigate("/chats-activos"), 3000); // Redirigir a la página de chats activos tras 3 segundos
            } else {
                setEstadoIntercambio("Has aceptado el intercambio. Esperando la confirmación del otro usuario."); // Mensaje de espera
            }
        } catch (error) {
            // Si ocurre un error, lo mostramos en la consola y establecemos un mensaje de error
            console.error("Error al aceptar intercambio:", error);
            setEstadoIntercambio("Hubo un problema al aceptar el intercambio.");
        }
    };
    

    const rechazarIntercambio = async () => {
        try {
            // Realizamos una solicitud POST al backend para rechazar el intercambio
            const response = await fetch("http://localhost:3001/api/chat/rechazar", {
                method: "POST", // Método HTTP para enviar datos
                headers: {
                    "Content-Type": "application/json", // Indicamos que enviamos datos en formato JSON
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Obtenemos el token de autenticación desde localStorage
                },
                body: JSON.stringify({ chat_id: id }), // Enviamos el ID del chat en el cuerpo de la solicitud
            });
    
            // Si la respuesta no es exitosa, lanzamos un error
            if (!response.ok) throw new Error("Error al rechazar el chat");
    
            // Actualizamos el estado para indicar que el usuario ha rechazado el chat
            setEstadoIntercambio("Has rechazado el chat. Será eliminado.");
    
            // Redirigir a la página de chats activos después de 3 segundos
            setTimeout(() => navigate("/chats-activos"), 3000);
        } catch (error) {
            // Si ocurre un error, lo mostramos en la consola y establecemos un mensaje de error
            console.error("Error al rechazar el chat:", error);
            setEstadoIntercambio("Hubo un problema al eliminar el chat.");
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
                            onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
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
