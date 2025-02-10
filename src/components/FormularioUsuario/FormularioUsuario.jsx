import React, { useState } from "react";
import "./FormularioUsuario.css";

const FormularioUsuario = ({ datosUsuario, onGuardar, onCancelar }) => {
  const [datosEditados, setDatosEditados] = useState({
    nombre: datosUsuario.nombre,
    email: datosUsuario.email,
    contrasenia: "", // La contraseña solo se actualiza si el usuario la cambia
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosEditados({ ...datosEditados, [name]: value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Recuperar el token de autenticación

      const response = await fetch("http://localhost:3001/api/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Agregar el token al encabezado
        },
        body: JSON.stringify({
          nombre: datosEditados.nombre,
          email: datosEditados.email,
          contrasenia: datosEditados.contrasenia ? datosEditados.contrasenia : undefined, // Solo enviar si la cambia
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onGuardar({ 
          nombre: datosEditados.nombre, 
          email: datosEditados.email, 
          contrasenia: datosEditados.contrasenia ? "Actualizada" : "No cambiada" 
        });
      } else {
        alert(data.message || "Error al actualizar los datos");
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      alert("Error en el servidor");
    }
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
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={datosEditados.email}
          onChange={manejarCambio}
          required
        />
      </label>
      <label>
        Nueva Contraseña (opcional):
        <input
          type="password"
          name="contrasenia"
          value={datosEditados.contrasenia}
          onChange={manejarCambio}
          placeholder="Déjalo en blanco si no deseas cambiarla"
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
