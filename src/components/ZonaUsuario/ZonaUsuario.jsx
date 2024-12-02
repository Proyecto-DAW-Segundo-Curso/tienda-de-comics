import React, { useState } from "react";
import FormularioUsuario from "../FormularioUsuario/FormularioUsuario";
import "./ZonaUsuario.css";

const ZonaUsuario = () => {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuario, setUsuario] = useState({
    nombre: "Juan Pérez",
    email: "juan.perez@example.com",
    contraseña: "********", // No mostrar la contraseña real
  });

  const actualizarUsuario = (nuevosDatos) => {
    setUsuario(nuevosDatos);
    setModoEdicion(false);
  };

  return (
    <div className="zona-usuario">
      <div className="contenedor-titulo">      
        <h2>Zona de Usuario</h2>
      </div>
      {modoEdicion ? (
        <FormularioUsuario
          datosUsuario={usuario}
          onGuardar={actualizarUsuario}
          onCancelar={() => setModoEdicion(false)}
        />
      ) : (
        <div className="datos-usuario">
          <p><strong>Nombre:</strong> {usuario.nombre}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
          <p><strong>Contraseña:</strong> {usuario.contraseña}</p>
          <button onClick={() => setModoEdicion(true)} className="btn">
            Modificar Datos
          </button>
        </div>
      )}
    </div>
  );
};

export default ZonaUsuario;
