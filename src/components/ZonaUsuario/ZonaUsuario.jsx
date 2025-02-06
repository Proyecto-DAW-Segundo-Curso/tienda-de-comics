import React, { useState } from "react";
import FormularioUsuario from "../FormularioUsuario/FormularioUsuario";
import "./ZonaUsuario.css";

const ZonaUsuario = ({ usuarioLogado }) => {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuario, setUsuario] = useState(usuarioLogado);

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
          <div className="tarjeta-info">
            <p><strong>Nombre:</strong> {usuario.nombre}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
            <p><strong>Contraseña:</strong> {usuario.contrasenia}</p>

          </div>
          <div className="tarjeta-opciones">
          <button onClick={() => setModoEdicion(true)} className="btn">
              Modificar Datos
            </button>
            <button onClick={() => setModoEdicion(true)} className="btn">
              Admin Comics
            </button>
            <button onClick={() => setModoEdicion(true)} className="btn">
              Crear Oferta
            </button>
            <button onClick={() => setModoEdicion(true)} className="btn">
              Mis Ofertas
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZonaUsuario;
