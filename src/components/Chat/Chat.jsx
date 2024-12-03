// Chat.js
import React, { useState } from 'react';
import './Chat.css';
const Chat = ({ vendedor, onClose }) => {
  const [mensaje, setMensaje] = useState('');
  const [conversacion, setConversacion] = useState([]);

  const enviarMensaje = () => {
    if (mensaje.trim() === '') return; // Evitar mensajes vacíos
    setConversacion([...conversacion, { quien: 'comprador', texto: mensaje }]);
    setMensaje('');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Conversación con {vendedor}</h2>
        <button onClick={onClose} className="cerrar-chat">X</button>
      </div>
      <div className="chat-messages">
        {conversacion.map((msg, index) => (
          <div key={index} className={`mensaje ${msg.quien}`}>
            <span>{msg.texto}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe tu mensaje..."
        />
        <button onClick={enviarMensaje}>Enviar</button>
      </div>
    </div>
  );
};

export default Chat;
