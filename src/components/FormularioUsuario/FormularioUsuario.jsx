import React, { useState } from "react";
import "./FormularioUsuario.css";

const FormularioUsuario = ({ datosUsuario, onGuardar, onCancelar }) => {
  const [datosEditados, setDatosEditados] = useState(datosUsuario);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosEditados({ ...datosEditados, [name]: value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    onGuardar(datosEditados);
  };

  return (
    <form className="formulario-usuario" onSubmit={manejarEnvio}>
      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          value={datosEditados.nombre}
          onChange={manejarCambio}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={datosEditados.email}
          onChange={manejarCambio}
        />
      </label>
      <label>
        Contraseña:
        <input
          type="password"
          name="contraseña"
          value={datosEditados.contraseña}
          onChange={manejarCambio}
        />
      </label>
      <div className="botones-formulario">
        <button type="submit" className="btn">
          Guardar Cambios
        </button>
        <button type="button" onClick={onCancelar} className="btn btn-cancelar">
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormularioUsuario;
