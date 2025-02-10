import React, { useState } from "react";
import FormularioUsuario from "../FormularioUsuario/FormularioUsuario";
import "./ZonaUsuario.css";
import { useNavigate } from "react-router-dom";

const ZonaUsuario = ({ usuarioLogado }) => {

  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuario, setUsuario] = useState(usuarioLogado);

  const actualizarUsuario = (nuevosDatos) => {
    setUsuario(nuevosDatos);
    setModoEdicion(false);
  };

  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header custom-header text-white fw-bold text-center">
          ZONA DE USUARIO
        </div>
        <div className="card-body custom-body">
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
                <button onClick={() => setModoEdicion(true)} className="btn custom-button text-black fw-bold me-2">
                  Modificar Datos
                </button>
                <button onClick={() => navigate("/admin-comics")} className="btn custom-button text-black fw-bold me-2">
                  Admin Comics
                </button>
                <button onClick={() => setModoEdicion(true)} className="btn custom-button text-black fw-bold me-2">
                  Crear Oferta
                </button>
                <button onClick={() => setModoEdicion(true)} className="btn custom-button text-black fw-bold me-2 text-black fw-bold me-2">
                  Mis Ofertas
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ZonaUsuario;
